package de.neuefische.backend.repository;

import de.neuefische.backend.model.Traveller;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravellerRepo extends MongoRepository<Traveller,String> {
}
