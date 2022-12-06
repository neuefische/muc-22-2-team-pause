package de.neuefische.backend.security;

import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.repository.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MongoUserDetailsServiceTest {
    MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);

    MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepo);
    @Test
    void loadUserByUsername_expect_exception() {
        assertThrows(UsernameNotFoundException.class, () -> mongoUserDetailsService.loadUserByUsername("test"));
    }

    @Test
    void loadUserByUsername_expect_user() {
        when(mongoUserRepo.findByUsername("test"))
                .thenReturn(Optional.of(new MongoUser("0","test","pw")));

        UserDetails resultUser = mongoUserDetailsService.loadUserByUsername("test");

        assertEquals("test", resultUser.getUsername());
        assertEquals("pw", resultUser.getPassword());
        assertEquals(Collections.emptySet(),resultUser.getAuthorities());
    }

}