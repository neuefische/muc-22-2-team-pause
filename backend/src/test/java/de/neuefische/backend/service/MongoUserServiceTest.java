package de.neuefische.backend.service;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.repository.TravellerRepo;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MongoUserServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    TravellerRepo travellerRepo = mock(TravellerRepo.class);
    UuidGeneratorService uuidGeneratorService = mock(UuidGeneratorService.class);
    MongoUserService mongoUserService = new MongoUserService(travellerRepo, uuidGeneratorService, mongoUserRepo);

    @Test
    void addNewUserAndTraveller_expect_givenId() {
        MongoUserRequest givenMongoUserRequest = new MongoUserRequest("nick","pw");
        String givenId = uuidGeneratorService.generateUuid();
        Traveller givenTraveller = mongoUserService.createTraveller(givenId, givenMongoUserRequest);
        MongoUser givenMongoUser = mongoUserService.createMongoUser(givenId, givenMongoUserRequest);

        when(mongoUserRepo.save(givenMongoUser))
                .thenReturn(givenMongoUser);
        when(travellerRepo.save(givenTraveller))
                .thenReturn(givenTraveller);

        Traveller traveller = mongoUserService.addNewUserAndTraveller(givenMongoUserRequest);

        assertEquals(givenId,traveller.id());
        assertEquals(givenTraveller,traveller);
    }

    @Test
    void deleteUserAndTravellerById_expect_id_String() {
        String givenId = "1";

        String result = mongoUserService.deleteUserAndTravellerById(givenId);

        assertEquals(givenId,result);

    }



}