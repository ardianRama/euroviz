package org.ardian.eurovizbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

/**
 * Configures the RestClient used to communicate with the World Bank API.
 */

@Configuration
public class WorldBankClientConfig {

    @Bean
    public RestClient worldBankRestClient(
            RestClient.Builder restClientBuilder,
            @Value("${worldbank.api.base-url}") String worldBankBaseUrl) {
        return restClientBuilder
                .baseUrl(worldBankBaseUrl)
                .build();
    }
}
