package de.neuefische.backend.controller;

import de.neuefische.backend.model.MongoUserRequest;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.service.MongoUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class MongoUserController {
    private final MongoUserService mongoUserService;

    public MongoUserController(MongoUserService mongoUserService) {
        this.mongoUserService = mongoUserService;
    }

    @PostMapping
    public Traveller addUser(@RequestBody MongoUserRequest userRequest) {
        return mongoUserService.addNewUserAndTraveller(userRequest);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        return mongoUserService.deleteUserAndTravellerById(id);
    }

    @GetMapping("/login/me")
    public String helloMe(Principal principal) {
        if (principal != null) {
            return principal.getName();
        }
        return "anonymousUser";
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/logout")
    public String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "anonymousUser";
    }


    @GetMapping("/{name}")
    public String getId(@PathVariable String name) {
        return mongoUserService.getIdByUsername(name);
    }

}
