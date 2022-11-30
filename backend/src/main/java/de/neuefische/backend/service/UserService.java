package de.neuefische.backend.service;

import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final UuidGeneratorService uuidGeneratorService;

    public UserService(UserRepo userRepo, UuidGeneratorService uuidGeneratorService) {
        this.userRepo = userRepo;
        this.uuidGeneratorService = uuidGeneratorService;
    }

    public List<User> listUsers() {
        return userRepo.findAll();
    }

    public User addUser(User user){
        User userWithId = new User(this.uuidGeneratorService.generateUuid(),user.name(),user.visitedCountries());
        return userRepo.save(userWithId);
    }


    public String deleteUser(String id){
        Optional<User> byId = userRepo.findById(id);
        if (byId.isEmpty()){
            throw new IllegalArgumentException();
        }
        userRepo.delete(byId.get());
        return id;
    }

}
