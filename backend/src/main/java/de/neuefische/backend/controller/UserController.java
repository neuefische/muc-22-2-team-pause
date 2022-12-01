package de.neuefische.backend.controller;

import de.neuefische.backend.model.User;
import de.neuefische.backend.model.UserRequest;
import de.neuefische.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
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
    public User addUser(@RequestBody UserRequest userRequest){
        User saveUser = new User("", userRequest.name(),new HashSet<>());
        return userService.addUser(saveUser);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
       return userService.deleteUserById(id);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable String id, @RequestBody UserRequest userRequest){
        User toEditUser = new User(id,userRequest.name(),userRequest.visitedCountries());
        return userService.updateUser(id,toEditUser);
    }
}
