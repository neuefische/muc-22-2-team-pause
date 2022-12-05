package de.neuefische.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongousers")
public record MongoUser(
        @Id
        String id,
        String username,
        String password
) {
}
