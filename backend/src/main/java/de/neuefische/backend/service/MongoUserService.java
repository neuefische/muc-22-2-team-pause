package de.neuefische.backend.service;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.repository.TravellerRepo;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

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

        Traveller savedTraveller = travellerRepo.save(createTraveller(idForUserAndTraveller,mongoUserRequest));

        mongoUserRepo.save(createMongoUser(idForUserAndTraveller,mongoUserRequest));

        return savedTraveller;
    }

    public Traveller createTraveller(String id, MongoUserRequest mongoUserRequest){
        return new Traveller(id,mongoUserRequest.username(),new HashSet<>());
    }

    public MongoUser createMongoUser(String id, MongoUserRequest mongoUserRequest){
        return new MongoUser(id, mongoUserRequest.username(), encoder.encode(mongoUserRequest.password()));
    }


    public String deleteUserAndTravellerById(String id) {

        travellerRepo.deleteById(id);
        mongoUserRepo.deleteById(id);

        return id;
    }

    public String getIdByUsername(String name){
        Optional<MongoUser> mongoUser = mongoUserRepo.findByUsername(name);
         if(mongoUser.isPresent()){
             return mongoUser.get().id();
         }
        throw new UsernameNotFoundException("bad credentials");
    }
}
