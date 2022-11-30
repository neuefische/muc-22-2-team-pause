package de.neuefische.backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
public record User(
        @Id
        String id,
        String name,
        List<Country> visitedCountries
) {
}
