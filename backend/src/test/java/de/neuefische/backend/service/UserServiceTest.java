package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchUserException;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
        when(userRepo.addUser(givenUser)).thenReturn(givenUser);
        User result = userService.addUser(givenUser);

        //then
        assertEquals(givenUser,result);
        verify(userRepo).addUser(givenUser);
    }

    @Test
    void deleteUser_expect_success() {
        //GIVEN
        String expected = "1";

        //WHEN
        when(userRepo.deleteUser(expected)).thenReturn(expected);
        String result = userService.deleteUser(expected);

        //THEN
        verify(userRepo).deleteUser(expected);
        assertEquals(expected,result);
    }

    @Test
    void updateUser_expect_exception() {
        User user = new User("10","nick",new HashSet<>());

        assertThrows(NoSuchUserException.class, () -> userService.updateUser("10", user));
    }
}