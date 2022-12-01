package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchUserException;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);
    UuidGeneratorService uuidGeneratorService = mock(UuidGeneratorService.class);
    UserService userService = new UserService(userRepo,uuidGeneratorService);

    @Test
    void listUsers_expect_emptyList() {
        List<User> expList = new ArrayList<>();

        List<User> result = userService.listUsers();

        assertEquals(expList,result);
    }

    @Test
    void addUser_expect_valid_user() {
        //given
        User givenUser = new User(null,"nick",new HashSet<>());

        //when
        when(userRepo.save(givenUser)).thenReturn(givenUser);
        User result = userService.addUser(givenUser);

        //then
        assertEquals(givenUser,result);
        verify(userRepo).save(givenUser);
    }

    @Test
    void deleteUser_expect_correct_id() {
        //given
        User givenUser = new User("0","hanna",new HashSet<>());
        //when
        userService.deleteUserById(givenUser.id());
        //then
        verify(userRepo).deleteById(givenUser.id());
    }

    @Test
    void findUserById_expect_throws_exception() {
        assertThrows(NoSuchElementException.class,()->userService.findUserById("0"));
    }

    @Test
    void findUser_expect_correct_user() {
        //given
        User givenUser = new User("0","hanna",new ArrayList<>());
        //when
        when(userRepo.findById(givenUser.id())).thenReturn(Optional.of(givenUser));
        User userResult = userService.findUserById(givenUser.id());
        //then
        assertEquals(givenUser,userResult);
    }

    @Test
    void updateUser_expect_exception() {
        User user = new User("10","nick",new HashSet<>());

        assertThrows(NoSuchUserException.class, () -> userService.updateUser("10", user));
    }
}