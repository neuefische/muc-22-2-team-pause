package de.neuefische.backend.model;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record User(
        @Id
        String id,
        String name,
        Set<Country> visitedCountries
) {
}
