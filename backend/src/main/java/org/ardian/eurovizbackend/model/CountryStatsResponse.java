package org.ardian.eurovizbackend.model;

public record CountryStatsResponse(
        String countryCode,
        String countryName,
        IndicatorValue population,
        IndicatorValue gdpPerCapita,
        IndicatorValue lifeExpectancy
) {
    public record IndicatorValue(String year, Double value) {
    }
}
