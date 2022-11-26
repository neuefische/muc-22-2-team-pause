package de.neuefische.backend.controller;

import de.neuefische.backend.model.User;
import de.neuefische.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")

public class UserController {
   private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> listUsers(){
        return userService.listUsers();
    }

    @PostMapping()
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
