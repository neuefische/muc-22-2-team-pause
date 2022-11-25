package de.neuefische.backend.service;

import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class RestCountriesService {

    public List<Country> refactorApiResponse(RestCountry[] apiResponse) {
        List<Country> countries = new ArrayList<>();

        for (RestCountry restCountry :
                apiResponse) {
            countries.add(new Country(restCountry.cca3(), restCountry.name().common(), restCountry.flag() ));
        }

        return countries;
    }
}
