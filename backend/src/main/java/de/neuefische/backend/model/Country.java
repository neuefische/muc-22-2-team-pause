package de.neuefische.backend.model;

import java.util.Locale;

public record Country(
        String threeLetterCode,
        String name,
        String flag
) {
}
