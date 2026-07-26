package org.ardian.eurovizbackend.controller;

import java.util.List;

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
    
    @GetMapping("/{code}/population")
    public List<WorldBankDataPoint> getPopulation(@PathVariable String code) {
        return worldBankService.getPopulation(code);
    }

    @GetMapping("/{code}/gdp-per-capita")
    public List<WorldBankDataPoint> getGdpPerCapita(@PathVariable String code) {
        return worldBankService.getGdpPerCapita(code);
    }

    @GetMapping("/{code}/life-expectancy")
    public List<WorldBankDataPoint> getLifeExpectancy(@PathVariable String code) {
        return worldBankService.getLifeExpectancy(code);
    }
}
