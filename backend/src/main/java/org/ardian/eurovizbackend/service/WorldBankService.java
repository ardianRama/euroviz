package org.ardian.eurovizbackend.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.ardian.eurovizbackend.model.CountryStatsResponse;
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

    public CountryStatsResponse getCountryStats(String countryCode) {
        List<WorldBankDataPoint> population = dataFetcher.fetchIndicator(countryCode, POPULATION_INDICATOR);
        List<WorldBankDataPoint> gdpPerCapita = dataFetcher.fetchIndicator(countryCode, GDP_PER_CAPITA_INDICATOR);
        List<WorldBankDataPoint> lifeExpectancy = dataFetcher.fetchIndicator(countryCode, LIFE_EXPECTANCY_INDICATOR);

        Optional<WorldBankDataPoint> latestPopulation = findLatestNonNullValue(population);
        Optional<WorldBankDataPoint> latestGdpPerCapita = findLatestNonNullValue(gdpPerCapita);
        Optional<WorldBankDataPoint> latestLifeExpectancy = findLatestNonNullValue(lifeExpectancy);

        String countryName = latestPopulation.or(() -> latestGdpPerCapita).or(() -> latestLifeExpectancy)
                .map(dp -> dp.country().value())
                .orElse(countryCode);

        return new CountryStatsResponse(
                countryCode,
                countryName,
                toIndicatorValue(latestPopulation),
                toIndicatorValue(latestGdpPerCapita),
                toIndicatorValue(latestLifeExpectancy)
        );
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
