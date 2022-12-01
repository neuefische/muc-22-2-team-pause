package de.neuefische.backend.model;

import java.util.List;

public record UserRequest(
        String id,
        String name,
        List<Country> visitedCountries
) {
}
