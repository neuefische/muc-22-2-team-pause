package de.neuefische.backend.repository;

import de.neuefische.backend.model.User;

import java.util.List;
import java.util.UUID;

public class UserRepo {
    private final List<User> users;

    public UserRepo(List<User> users) {
        this.users = users;
    }


    public List<User> getUsers() {
        return users;
    }

    public User addUser(User user) {
        User newUser = new User(generateID(), user.name(), user.visitedCountries());
        this.users.add(newUser);
        return newUser;
    }

    private String generateID() {
        return UUID.randomUUID().toString();
    }


}
