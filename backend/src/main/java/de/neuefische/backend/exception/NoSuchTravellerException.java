package de.neuefische.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoSuchTravellerException extends IllegalArgumentException {
    public NoSuchTravellerException(String s) {
        super(s);
    }

}
