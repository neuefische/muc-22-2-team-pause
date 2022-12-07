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

class TravellerServiceTest {

    TravellerRepo travellerRepo = mock(TravellerRepo.class);
    TravellerService travellerService = new TravellerService(travellerRepo);

    @Test
    void listTravellers_expect_emptyList() {
        List<Traveller> expList = new ArrayList<>();

        List<Traveller> result = travellerService.listTravellers();

        assertEquals(expList, result);
    }


    @Test
    void findTravellerById_expect_throws_exception() {
        assertThrows(NoSuchTravellerException.class, () -> travellerService.findTravellerById("0"));
    }

    @Test
    void findTraveller_expect_correct_Traveller() {
        //given
        Traveller givenTraveller = new Traveller("0", "hanna", new HashSet<>());
        //when
        when(travellerRepo.findById(givenTraveller.id())).thenReturn(Optional.of(givenTraveller));
        Traveller TravellerResult = travellerService.findTravellerById(givenTraveller.id());
        //then
        assertEquals(givenTraveller, TravellerResult);
    }

    @Test
    void updateTraveller_expect_exception_because_there_are_no_Travellers_saved() {
        Traveller traveller = new Traveller("10", "nick", new HashSet<>());

        assertThrows(NoSuchTravellerException.class, () -> travellerService.updateTraveller("10", traveller));
    }


    @Test
    void updateTraveller_expect_noException_because_there_are_Travellers_saved() {
        Traveller traveller = new Traveller("10", "lily", new HashSet<>());

        when(travellerRepo.findAll()).thenReturn(List.of(traveller));
        when(travellerRepo.save(Mockito.any(Traveller.class)))
                .thenReturn(traveller);
        Traveller result = travellerService.updateTraveller(traveller.id(), traveller);

        assertEquals(traveller, result);

    }
}