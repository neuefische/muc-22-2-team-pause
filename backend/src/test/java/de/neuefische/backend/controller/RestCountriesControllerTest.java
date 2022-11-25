package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import de.neuefische.backend.service.RestCountriesService;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


class RestCountriesControllerTest {

    @Test
    void get_countries_returns_a_list_of_countries_and_deserialize() throws IOException, RestCountryException {
        String givenJson = """
                [
                    {
                        "name": {
                            "common": "Mauritania",
                            "official": "Islamic Republic of Mauritania",
                            "nativeName": {
                                "ara": {
                                    "official": "الجمهورية الإسلامية الموريتانية",
                                    "common": "موريتانيا"
                                }
                            }
                        },
                        "cca3": "MRT",
                        "capital": [
                            "Nouakchott"
                        ],
                        "altSpellings": [
                            "MR",
                            "Islamic Republic of Mauritania",
                            "al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah"
                        ],
                        "flag": "🇲🇷"
                    },
                    {
                        "name": {
                            "common": "Aruba",
                            "official": "Aruba",
                            "nativeName": {
                                "nld": {
                                    "official": "Aruba",
                                    "common": "Aruba"
                                },
                                "pap": {
                                    "official": "Aruba",
                                    "common": "Aruba"
                                }
                            }
                        },
                        "cca3": "ABW",
                        "capital": [
                            "Oranjestad"
                        ],
                        "altSpellings": [
                            "AW"
                        ],
                        "flag": "🇦🇼"
                    }
                    ]
                """;

        MockWebServer mockWebServer = new MockWebServer();
        RestCountriesService restCountriesService = new RestCountriesService();

        mockWebServer.enqueue(
                new MockResponse().setResponseCode(200)
                        .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                        .setBody(givenJson));

        ObjectMapper objectMapper = new ObjectMapper();
        RestCountry[] restCountries = objectMapper.readValue(givenJson, RestCountry[].class);

        List<Country> countries = restCountriesService.refactorApiResponse(restCountries);
        assertThat(countries.get(0).name()).isEqualTo("Mauritania");
        assertThat(countries.get(0).flag()).isEqualTo("🇲🇷");
        assertThat(countries.get(0).threeLetterCode()).isEqualTo("MRT");

        mockWebServer.close();


    }
}