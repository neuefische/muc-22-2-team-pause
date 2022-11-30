package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchUserException;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final UuidGeneratorService uuidGeneratorService;

    public UserService(UserRepo userRepo, UuidGeneratorService uuidGeneratorService) {
        this.userRepo = userRepo;
        this.uuidGeneratorService = uuidGeneratorService;
    }

    public List<User> listUsers() {
        return userRepo.getUsers();
    }

    public User addUser(User user) {
        User userWithId = new User(this.uuidGeneratorService.generateUuid(), user.name(), user.visitedCountries());
        return userRepo.addUser(userWithId);
    }


    public String deleteUser(String id) {
        userRepo.deleteUser(id);
        return id;
    }

    public User updateUser(String id, User editedUser){
        checkIfExsists(id);
        return userRepo.updateUser(id, editedUser);
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
