package org.ardian.eurovizbackend.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.ardian.eurovizbackend.exception.WorldBankApiException;
import org.ardian.eurovizbackend.model.CountryStatsResponse;
import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;
import tools.jackson.databind.type.CollectionType;

@Service
public class WorldBankService {

    private static final String POPULATION_INDICATOR = "SP.POP.TOTL";
    private static final String GDP_PER_CAPITA_INDICATOR = "NY.GDP.PCAP.CD";
    private static final int MAX_RESULTS_PER_PAGE = 100;

    private final RestClient restClient;
    private final JsonMapper jsonMapper;

    public WorldBankService(RestClient worldBankRestClient, JsonMapper jsonMapper) {
        this.restClient = worldBankRestClient;
        this.jsonMapper = jsonMapper;
    }

    public List<WorldBankDataPoint> getPopulation(String countryCode) {
        return fetchIndicator(countryCode, POPULATION_INDICATOR);
    }

    public CountryStatsResponse getCountryStats(String countryCode) {
        List<WorldBankDataPoint> population = fetchIndicator(countryCode, POPULATION_INDICATOR);
        List<WorldBankDataPoint> gdpPerCapita = fetchIndicator(countryCode, GDP_PER_CAPITA_INDICATOR);

        Optional<WorldBankDataPoint> latestPopulation = findLatestNonNullValue(population);
        Optional<WorldBankDataPoint> latestGdpPerCapita = findLatestNonNullValue(gdpPerCapita);

        String countryName = latestPopulation.or(() -> latestGdpPerCapita)
                .map(dp -> dp.country().value())
                .orElse(countryCode);

        return new CountryStatsResponse(
                countryCode,
                countryName,
                toIndicatorValue(latestPopulation),
                toIndicatorValue(latestGdpPerCapita)
        );
    }

    private List<WorldBankDataPoint> fetchIndicator(String countryCode, String indicatorCode) {
        String rawJson = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/country/{code}/indicator/" + indicatorCode)
                        .queryParam("format", "json")
                        .queryParam("per_page", MAX_RESULTS_PER_PAGE)
                        .build(countryCode))
                .retrieve()
                .body(String.class);

        return parseDataPoints(rawJson, countryCode);
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

    private Optional<WorldBankDataPoint> findLatestNonNullValue(List<WorldBankDataPoint> dataPoints) {
        return dataPoints.stream()
                .filter(dp -> dp.value() != null)
                .max(Comparator.comparing(WorldBankDataPoint::date));
    }

    private CountryStatsResponse.IndicatorValue toIndicatorValue(Optional<WorldBankDataPoint> dataPoint) {
        return dataPoint
                .map(dp -> new CountryStatsResponse.IndicatorValue(dp.date(), dp.value()))
                .orElse(null);
    }
}
