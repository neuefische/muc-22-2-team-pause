package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchTravellerException;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.TravellerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravellerService {
    private final TravellerRepo travellerRepo;

    public TravellerService(TravellerRepo userRepo) {
        this.travellerRepo = userRepo;
    }

    public List<Traveller> listTravellers() {
        return travellerRepo.findAll();
    }


    public Traveller findTravellerById(String id){
        return travellerRepo.findById(id)
                .orElseThrow(() -> new NoSuchTravellerException("Traveller does not exist"));
    }

    public Traveller updateTraveller(String id, Traveller editedUser){
        checkIfTravellerExists(id);
        return travellerRepo.save(editedUser);
    }

    private void checkIfTravellerExists(String id) throws NoSuchTravellerException {
        for (Traveller user :
                listTravellers()) {
            if (user.id().equals(id)) {
                return;
            }
        }
        throw new NoSuchTravellerException("User with id"+ id+" not found ");
    }



}
