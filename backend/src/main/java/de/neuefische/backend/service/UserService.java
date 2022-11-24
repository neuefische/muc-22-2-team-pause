package de.neuefische.backend.service;

import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> listUsers() {
        return userRepo.getUsers();
    }

    public User addUser(User user){
        return userRepo.addUser(user);
    }


}
