package de.neuefische.backend.controller;

import de.neuefische.backend.RestCountriesWebClient;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.RecordedRequest;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;


class RestCountriesControllerTest {

    @Test
    void get_countries_returns_a_list_of_countries_and_deserialize()
            throws IOException, InterruptedException {
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

        RestCountriesWebClient restCountriesWebClient =
                new RestCountriesWebClient(mockWebServer.url("/").url().toString());

        mockWebServer.enqueue(
                new MockResponse().setResponseCode(200)
                        .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                        .setBody(givenJson));

        restCountriesWebClient.sendGetRequest();
        RecordedRequest request = mockWebServer.takeRequest();

        assertThat(request.getMethod()).isEqualTo("GET");

        mockWebServer.close();


    }
}