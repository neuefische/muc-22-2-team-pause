package de.neuefische.backend.service;

import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    UserService userService = new UserService(new UserRepo(new ArrayList<>()));
    @Test
    void listUsers_expect_emptyList() {
        List<User> expList = new ArrayList<>();

        List<User> result = userService.listUsers();

        assertEquals(expList,result);
    }

    @Test
    void addUser_expect_valid_user_not_empty_id() {
        //given
        User givenUser = new User(null,"nick",new ArrayList<>());

        //when
        User result = userService.addUser(givenUser);

        //then
        assertInstanceOf(User.class,result);
        assertFalse(result.id().isEmpty());
        assertFalse(result.id().isBlank());
    }
}