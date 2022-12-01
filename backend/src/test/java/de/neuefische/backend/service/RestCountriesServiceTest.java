package de.neuefische.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class RestCountriesServiceTest {

    RestCountriesService restCountriesService = new RestCountriesService();

    @Test
    void refactorApiResponse_deseralize_properly() throws JsonProcessingException, RestCountryException {
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
        ObjectMapper objectMapper = new ObjectMapper();
        RestCountry[] restCountries = objectMapper.readValue(givenJson, RestCountry[].class);

        List<Country> countries = restCountriesService.refactorApiResponse(Arrays.asList(restCountries));
        assertThat(countries.get(0).name()).isEqualTo("Mauritania");
        assertThat(countries.get(0).flag()).isEqualTo("🇲🇷");
        assertThat(countries.get(0).threeLetterCode()).isEqualTo("MRT");
        assertThat(countries.get(1).name()).isEqualTo("Aruba");
        assertThat(countries.get(1).flag()).isEqualTo("🇦🇼");
        assertThat(countries.get(1).threeLetterCode()).isEqualTo("ABW");
    }
}