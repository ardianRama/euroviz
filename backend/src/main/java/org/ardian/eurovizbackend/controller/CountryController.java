package org.ardian.eurovizbackend.controller;

import java.util.List;

import org.ardian.eurovizbackend.model.CountryStatsResponse;
import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.ardian.eurovizbackend.service.WorldBankService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final WorldBankService worldBankService;

    public CountryController(WorldBankService worldBankService) {
        this.worldBankService = worldBankService;
    }

    //http://localhost:8080/api/countries/swe/population
    @GetMapping("/{code}/population")
    public List<WorldBankDataPoint> getPopulation(@PathVariable String code) {
        return worldBankService.getPopulation(code);
    }

    //http://localhost:8080/api/countries/se/stats
    @GetMapping("/{code}/stats")
    public CountryStatsResponse getStats(@PathVariable String code) {
        return worldBankService.getCountryStats(code);
    }

    @GetMapping("/{code}/gdp-per-capita")
    public List<WorldBankDataPoint> getGdpPerCapita(@PathVariable String code) {
        return worldBankService.getGdpPerCapita(code);
    }
}
