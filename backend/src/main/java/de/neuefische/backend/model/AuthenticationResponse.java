package de.neuefische.backend.model;

public record AuthenticationResponse(
        Traveller traveller,
        String username
) {
}
