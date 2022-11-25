package de.neuefische.backend.repository;

import de.neuefische.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepo {
    private final List<User> users;

    public UserRepo(List<User> users) {
        this.users = users;
    }


    public List<User> getUsers() {
        return users;
    }

    public User addUser(User user) {
        this.users.add(user);
        return user;
    }



}
