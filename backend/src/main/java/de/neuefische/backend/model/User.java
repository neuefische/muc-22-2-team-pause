package de.neuefische.backend.model;
import java.util.List;

public record User(
        String id,
        String name,
        List<Country> visitedCountries
) {
}
