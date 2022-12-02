package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchUserException;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public User addUser(User user) {
        User userWithId = new User(this.uuidGeneratorService.generateUuid(), user.name(), user.visitedCountries());
        return userRepo.save(userWithId);
    }


    public String deleteUserById(String id) {
        userRepo.deleteById(id);
        return id;
    }

    public User findUserById(String id){
        return userRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User with id " + id + "does not exist"));
    }

    public User updateUser(String id, User editedUser){
        checkIfExsists(id);
        return userRepo.save(editedUser);
    }

    private void checkIfExsists(String id) throws NoSuchUserException {
        for (User user :
                listUsers()) {
            if (user.id().equals(id)) {
                return;
            }
        }
        throw new NoSuchUserException("User with id"+ id+" not found ");
    }
}
