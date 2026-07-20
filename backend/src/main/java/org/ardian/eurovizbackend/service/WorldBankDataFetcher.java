package org.ardian.eurovizbackend.service;

import java.util.List;

import org.ardian.eurovizbackend.exception.WorldBankApiException;
import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import tools.jackson.databind.type.CollectionType;

@Component
public class WorldBankDataFetcher {

    private static final int MAX_RESULTS_PER_PAGE = 100;

    private final RestClient restClient;
    private final JsonMapper jsonMapper;

    public WorldBankDataFetcher(RestClient worldBankRestClient, JsonMapper jsonMapper) {
        this.restClient = worldBankRestClient;
        this.jsonMapper = jsonMapper;
    }

    @Cacheable("worldBankData")
    public List<WorldBankDataPoint> fetchIndicator(String countryCode, String indicatorCode) {
        return fetchWithRetry(countryCode, indicatorCode, 3);
    }

    private List<WorldBankDataPoint> fetchWithRetry(String countryCode, String indicatorCode, int attemptsLeft) {
        try {
            String rawJson = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/country/{code}/indicator/" + indicatorCode)
                            .queryParam("format", "json")
                            .queryParam("per_page", MAX_RESULTS_PER_PAGE)
                            .build(countryCode))
                    .retrieve()
                    .body(String.class);

            return parseDataPoints(rawJson, countryCode);
        } catch (RuntimeException e) {
            if (attemptsLeft > 1) {
                return fetchWithRetry(countryCode, indicatorCode, attemptsLeft - 1);
            }
            throw new WorldBankApiException(
                    "Failed to fetch data from World Bank after multiple attempts", countryCode, e);
        }
    }

    private List<WorldBankDataPoint> parseDataPoints(String rawJson, String countryCode) {
        try {
            JsonNode root = jsonMapper.readTree(rawJson);
            JsonNode dataArrayNode = root.get(1);

            if (dataArrayNode == null || dataArrayNode.isNull()) {
                return List.of();
            }

            CollectionType listType = jsonMapper.getTypeFactory()
                    .constructCollectionType(List.class, WorldBankDataPoint.class);

            return jsonMapper.convertValue(dataArrayNode, listType);
        } catch (RuntimeException e) {
            throw new WorldBankApiException("Failed to parse World Bank API response", countryCode, e);
        }
    }
}
