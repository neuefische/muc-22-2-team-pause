package de.neuefische.backend.model;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("travellers")
public record Traveller(
        @Id
        String id,
        String name,
        Set<Country> visitedCountries
) {
}
