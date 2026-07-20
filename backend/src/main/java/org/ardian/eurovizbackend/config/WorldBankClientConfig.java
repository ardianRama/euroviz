package org.ardian.eurovizbackend.config;

import java.net.http.HttpClient;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
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

        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();

        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(Duration.ofSeconds(6));

        return restClientBuilder
                .baseUrl(worldBankBaseUrl)
                .requestFactory(requestFactory)
                .build();
    }
}