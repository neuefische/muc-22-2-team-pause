package de.neuefische.backend.model;

import java.util.Set;

public record TravellerRequest(
        String name,
        Set<Country> visitedCountries

) {
}
