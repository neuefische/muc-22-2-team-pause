package de.neuefische.backend;

import de.neuefische.backend.model.restcountries.RestCountry;
import org.springframework.http.HttpMethod;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

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

    public RestCountry[] sendGetRequest(){

        return this.webClient
                .method(HttpMethod.GET)
                .uri("/all")
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(RestCountry[].class))
                .block();
    }

}
