package de.neuefische.backend.model.restcountries;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RestCountry(
        RestCountryName name,
        String flag,
        String cca3
) {
}
