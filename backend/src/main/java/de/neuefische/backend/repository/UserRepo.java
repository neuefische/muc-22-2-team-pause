package de.neuefische.backend.repository;

import de.neuefische.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserRepo {
    private final Map<String, User> users = new HashMap<>();

    public List<User> getUsers() {
        return new ArrayList<>(users.values());
    }

    public User addUser(User user) {
        this.users.put(user.id(), user);
        return user;
    }

    public String deleteUser(String id) {
        this.users.remove(id);
        return id;
    }
}
