package de.neuefische.backend.model;

import java.util.Set;

public record UserRequest(
        String name,
        Set<Country> visitedCountries

) {
}
