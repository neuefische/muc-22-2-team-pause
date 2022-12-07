package de.neuefische.backend.model;

public record MongoUserRequest(
        String username,
        String password
) {
}
