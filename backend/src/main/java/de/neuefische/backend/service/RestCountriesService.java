package de.neuefische.backend.service;

import de.neuefische.backend.exception.RestCountryException;
import de.neuefische.backend.model.Country;
import de.neuefische.backend.model.restcountries.RestCountry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class RestCountriesService {

    public List<Country> refactorApiResponse(RestCountry[] apiResponse) throws RestCountryException {
        if (apiResponse == null) {
            throw new RestCountryException("RESTCountry API seems to be unavailable");
        }
        List<Country> countries = new ArrayList<>();

        for (RestCountry restCountry :
                apiResponse) {
            countries.add(new Country(restCountry.cca3(), restCountry.name().common(), restCountry.flag() ));
        }

        return countries;
    }
}
