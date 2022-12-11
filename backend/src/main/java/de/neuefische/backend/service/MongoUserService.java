package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchTravellerException;
import de.neuefische.backend.model.AuthenticationResponse;
import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.repository.TravellerRepo;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private static final String badCredentials = "bad credentials";

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


    public AuthenticationResponse getTravellerBySecurityContext() {
        String userNameBySecurityContext = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<MongoUser> userByUsername = mongoUserRepo
                .findByUsername(userNameBySecurityContext);
        if (userByUsername.isPresent()){
            Optional<Traveller> travellerById = travellerRepo.findById(userByUsername.get().id());
            if (travellerById.isPresent()){
                return new AuthenticationResponse(travellerById.get(),userByUsername.get().username());
            }else {
                throw new NoSuchTravellerException(badCredentials);
            }
        }
        return new AuthenticationResponse(
                new Traveller("",userNameBySecurityContext,new HashSet<>()),
                userNameBySecurityContext);
    }
}
