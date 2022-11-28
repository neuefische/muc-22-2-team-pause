package de.neuefische.backend.model;
import java.util.Set;

public record User(
        String id,
        String name,
        Set<Country> visitedCountries
) {
}
