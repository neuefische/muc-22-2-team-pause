package de.neuefische.backend.service;

import de.neuefische.backend.exception.NoSuchTravellerException;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.TravellerRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    TravellerRepo userRepo = mock(TravellerRepo.class);
    TravellerService userService = new TravellerService(userRepo);

    @Test
    void listUsers_expect_emptyList() {
        List<Traveller> expList = new ArrayList<>();

        List<Traveller> result = userService.listTravellers();

        assertEquals(expList, result);
    }


    @Test
    void findUserById_expect_throws_exception() {
        assertThrows(NoSuchElementException.class, () -> userService.findTravellerById("0"));
    }

    @Test
    void findUser_expect_correct_user() {
        //given
        Traveller givenUser = new Traveller("0", "hanna", new HashSet<>());
        //when
        when(userRepo.findById(givenUser.id())).thenReturn(Optional.of(givenUser));
        Traveller userResult = userService.findTravellerById(givenUser.id());
        //then
        assertEquals(givenUser, userResult);
    }

    @Test
    void updateUser_expect_exception_because_there_are_no_users_saved() {
        Traveller user = new Traveller("10", "nick", new HashSet<>());

        assertThrows(NoSuchTravellerException.class, () -> userService.updateTraveller("10", user));
    }


    @Test
    void updateUser_expect_noException_because_there_are_users_saved() {
        Traveller user = new Traveller("10", "lily", new HashSet<>());

        when(userRepo.findAll()).thenReturn(List.of(user));
        when(userRepo.save(Mockito.any(Traveller.class)))
                .thenReturn(user);
        Traveller result = userService.updateTraveller(user.id(), user);

        assertEquals(user, result);

    }
}