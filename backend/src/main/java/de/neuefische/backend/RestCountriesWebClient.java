package de.neuefische.backend;

import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.restcountries.RestCountry;
import org.springframework.http.HttpMethod;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

public class RestCountriesWebClient {
    private WebClient webClient;

    private final String baseUrl;

    public RestCountriesWebClient(String baseUrl) {
        this.baseUrl = baseUrl;
        setUp();
    }

    private void setUp(){
        final int size = 16 * 1024 * 1024;
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();

        this.webClient = WebClient.builder()
                .baseUrl(this.baseUrl)
                .exchangeStrategies(strategies)
                .build();
    }

    public List<RestCountry> getAllCountries() throws RestCountryException {

        RestCountry[] restCountries =  this.webClient
                .method(HttpMethod.GET)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(RestCountry[].class))
                .block();
        if (restCountries != null) {
            return Arrays.asList(restCountries);
        }else {
            throw new RestCountryException("Respone is null");
        }
    }

}
