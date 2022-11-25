package de.neuefische.backend.controller;

import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import de.neuefische.backend.service.RestCountriesService;
import de.neuefische.backend.RestCountriesWebClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class RestCountriesController {

    private final RestCountriesWebClient webClient = new RestCountriesWebClient("https://restcountries.com/v3.1/");
    private final RestCountriesService restCountriesService;

    public RestCountriesController( RestCountriesService restCountriesService) {
        this.restCountriesService = restCountriesService;
    }

    @GetMapping()
    public List<Country> countries() throws RestCountryException {
        RestCountry[] restCountries = this.webClient.sendGetRequest();

        return restCountriesService.refactorApiResponse(restCountries);
    }
}
