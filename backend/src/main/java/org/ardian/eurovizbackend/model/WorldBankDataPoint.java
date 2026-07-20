package org.ardian.eurovizbackend.model;

/**
 * Represents a single population data point returned by the World Bank API
 * for the "SP.POP.TOTL" (total population) indicator.
 *
 * Maps one object from the data array, for example:
 {
 "country": {
 "id": "SE",
 "value": "Sweden"
 },
 "date": "2025",
 "value": 10596620
 }
 */
public record WorldBankDataPoint(
        CountryRef country,
        String date,
        Double value
) {
    public record CountryRef(String id, String value) {
    }
}
