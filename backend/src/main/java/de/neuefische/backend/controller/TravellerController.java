package de.neuefische.backend.controller;

import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.model.TravellerRequest;
import de.neuefische.backend.service.TravellerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traveller")

public class TravellerController {
   private final TravellerService travellerService;

    public TravellerController(TravellerService userService) {
        this.travellerService = userService;
    }

    @GetMapping()
    public List<Traveller> listTravellers(){
        return travellerService.listTravellers();
    }


    @PutMapping("/{id}")
    public Traveller update(@PathVariable String id, @RequestBody TravellerRequest travellerRequest){
        Traveller toEditUser = new Traveller(id,travellerRequest.name(),travellerRequest.visitedCountries());
        return travellerService.updateTraveller(id,toEditUser);
    }

    @GetMapping("/{id}")
    public Traveller getById(@PathVariable String id){

        return travellerService.findTravellerById(id);
    }
}
