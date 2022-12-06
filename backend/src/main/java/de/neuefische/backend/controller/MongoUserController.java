package de.neuefische.backend.controller;

import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.service.MongoUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/user")
public class MongoUserController {
    private final MongoUserService mongoUserService ;

    public MongoUserController(MongoUserService mongoUserService) {
        this.mongoUserService = mongoUserService;
    }

    @PostMapping
    public Traveller addUser(@RequestBody MongoUserRequest userRequest){
        return mongoUserService.addNewUserAndTraveller(userRequest);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
       return mongoUserService.deleteUserAndTravellerById(id);
    }

    @PostMapping("/login")
    public String login(){
        //lets give back a nice object.
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public void logout(){
        SecurityContextHolder.clearContext();
    }
}
