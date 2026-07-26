package org.ardian.eurovizbackend.service;

import java.util.List;

import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.springframework.stereotype.Service;

@Service
public class WorldBankService {

    private static final String POPULATION_INDICATOR = "SP.POP.TOTL";
    private static final String GDP_PER_CAPITA_INDICATOR = "NY.GDP.PCAP.CD";
    private static final String LIFE_EXPECTANCY_INDICATOR = "SP.DYN.LE00.IN";

    private final WorldBankDataFetcher dataFetcher;

    public WorldBankService(WorldBankDataFetcher dataFetcher) {
        this.dataFetcher = dataFetcher;
    }

    public List<WorldBankDataPoint> getPopulation(String countryCode) {
        return dataFetcher.fetchIndicator(countryCode, POPULATION_INDICATOR);
    }

    public List<WorldBankDataPoint> getGdpPerCapita(String countryCode) {
        return dataFetcher.fetchIndicator(countryCode, GDP_PER_CAPITA_INDICATOR);
    }

    public List<WorldBankDataPoint> getLifeExpectancy(String countryCode) {
        return dataFetcher.fetchIndicator(countryCode, LIFE_EXPECTANCY_INDICATOR);
    }
}
