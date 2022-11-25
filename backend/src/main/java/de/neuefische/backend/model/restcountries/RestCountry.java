package de.neuefische.backend.model.restcountries;

public record RestCountry(
        RestCountryName name,
        String flag,
        String cca3
) {
}
