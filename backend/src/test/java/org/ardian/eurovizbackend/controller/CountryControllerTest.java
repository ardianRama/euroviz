package org.ardian.eurovizbackend.controller;

import java.util.List;

import org.ardian.eurovizbackend.model.WorldBankDataPoint;
import org.ardian.eurovizbackend.service.WorldBankService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CountryController.class)
class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private WorldBankService worldBankService;

    @Test
    void shouldReturnPopulationDataFromService() throws Exception {
        WorldBankDataPoint dataPoint = new WorldBankDataPoint(
                new WorldBankDataPoint.CountryRef("SE", "Sweden"), "2023", 10_000_000.0);

        when(worldBankService.getPopulation("se")).thenReturn(List.of(dataPoint));

        mockMvc.perform(get("/api/countries/se/population"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].date").value("2023"))
                .andExpect(jsonPath("$[0].value").value(10_000_000.0));
    }
}
