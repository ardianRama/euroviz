package org.ardian.eurovizbackend.service;

import java.util.List;

import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.json.JsonMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class WorldBankDataFetcherTest {

    private MockRestServiceServer mockServer;
    private WorldBankDataFetcher fetcher;

    @BeforeEach
    void setUp() {
        RestClient.Builder builder = RestClient.builder().baseUrl("https://api.worldbank.org/v2");
        mockServer = MockRestServiceServer.bindTo(builder).build();
        RestClient restClient = builder.build();
        fetcher = new WorldBankDataFetcher(restClient, JsonMapper.builder().build());
    }

    @Test
    void shouldParseIndicatorDataFromWorldBank() {
        mockServer.expect(requestTo("https://api.worldbank.org/v2/country/se/indicator/SP.POP.TOTL?format=json&per_page=100"))
                .andRespond(withSuccess(populationResponseJson(), MediaType.APPLICATION_JSON));

        List<WorldBankDataPoint> result = fetcher.fetchIndicator("se", "SP.POP.TOTL");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).date()).isEqualTo("2023");
        assertThat(result.get(0).value()).isEqualTo(10521556.0);
        assertThat(result.get(0).country().value()).isEqualTo("Sweden");
    }

    private String populationResponseJson() {
        return """
                [
                  { "page": 1, "pages": 1, "per_page": 100, "total": 1 },
                  [
                    {
                      "indicator": { "id": "SP.POP.TOTL", "value": "Population, total" },
                      "country": { "id": "SE", "value": "Sweden" },
                      "date": "2023",
                      "value": 10521556
                    }
                  ]
                ]
                """;
    }
}
