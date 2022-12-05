package de.neuefische.backend.service;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.repository.TravellerRepo;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
@Service
public class MongoUserService {
    private final TravellerRepo travellerRepo;
    private final UuidGeneratorService uuidGeneratorService;
    private final MongoUserRepo mongoUserRepo;
    private final PasswordEncoder encoder = new Argon2PasswordEncoder();

    public MongoUserService(TravellerRepo travellerRepo, UuidGeneratorService uuidGeneratorService, MongoUserRepo mongoUserRepo) {
        this.travellerRepo = travellerRepo;
        this.uuidGeneratorService = uuidGeneratorService;
        this.mongoUserRepo = mongoUserRepo;
    }

    public Traveller addNewUserAndTraveller(MongoUserRequest mongoUserRequest){
        String idForUserAndTraveller = uuidGeneratorService.generateUuid();

        Traveller newTraveller = new Traveller
                (idForUserAndTraveller,mongoUserRequest.username(),new HashSet<>());
        Traveller savedTraveller = travellerRepo.save(newTraveller);

        MongoUser newMongoUser = new MongoUser
                (idForUserAndTraveller, mongoUserRequest.username(), encoder.encode(mongoUserRequest.password()));
        mongoUserRepo.save(newMongoUser);

        return savedTraveller;
    }


    public String deleteUserAndTravellerById(String id) {

        travellerRepo.deleteById(id);
        mongoUserRepo.deleteById(id);

        return id;
    }
}
