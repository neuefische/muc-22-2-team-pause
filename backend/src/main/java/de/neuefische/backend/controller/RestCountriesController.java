package de.neuefische.backend.controller;

import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import de.neuefische.backend.service.RestCountriesService;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class RestCountriesController {

    private final WebClient webClient;
    private final RestCountriesService restCountriesService;

    public RestCountriesController(WebClient webClient, RestCountriesService restCountriesService) {
        this.webClient = webClient;
        this.restCountriesService = restCountriesService;
    }

    @GetMapping()
    public List<Country> countries() throws RestCountryException {
        RestCountry[] restCountries = webClient
                .method(HttpMethod.GET)
                .uri("/all")
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(RestCountry[].class))
                .block();

        return restCountriesService.refactorApiResponse(restCountries);
    }
}
