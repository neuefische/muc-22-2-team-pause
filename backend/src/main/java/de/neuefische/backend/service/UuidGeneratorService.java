package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UuidGeneratorService {

    public String generateUuid(){
        return UUID.randomUUID().toString();
    }
}
