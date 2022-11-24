package de.neuefische.backend.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public record User(
        String id,
        String name,
        List<Country> visitedCountries
) {
}
