package de.neuefische.backend.controller;

import de.neuefische.backend.model.User;
import de.neuefische.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")

public class UserController {
   private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public Map<String,User> listUsers(){
        return userService.listUsers();
    }

    @PostMapping()
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
       return userService.deleteUser(id);
    }
}
