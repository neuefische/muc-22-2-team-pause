package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.User;
import de.neuefische.backend.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashSet;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    String userEndPoint = "/api/user";
    UserRepo userRepo = mock(UserRepo.class);

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void listUsers_expect_empty_list() throws Exception {
        mvc.perform(get(userEndPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void addUser_expect_valid_user_and_an_id() throws Exception {
        MvcResult result = mvc.perform(post(userEndPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "name": "nick",
                                "visitedCountries": []
                                }
                                """))
                .andExpect(status().isOk())
                .andReturn();

        User actualResult = objectMapper.readValue(result.getResponse().getContentAsString(), User.class);

        assertFalse(actualResult.id().isEmpty());
    }


    @DirtiesContext
    @Test
    void expect_successful_delete() throws Exception {
        String userAsString = mvc.perform(
                        post(userEndPoint)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"name":"Max Mustermann"}
                                        """)
                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        User resultUser = objectMapper.readValue(userAsString, User.class);
        String id = resultUser.id();

        mvc.perform(delete(userEndPoint + "/" + id))
                .andExpect(status().isOk());
    }

    @Test
    void update_expect_NotFound_status() throws Exception {
        mvc.perform(put(userEndPoint + "/" + "10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "0",
                                "name": "nick",
                                "visitedCountries": []
                                }
                                """))
                .andExpect(status().isNotFound());
    }

    @Test
    void update() throws Exception {
        User user = new User("10", "lily", new HashSet<>());

        when(userRepo.findAll()).thenReturn(List.of(user));
        when(userRepo.save(Mockito.any(User.class)))
                .thenReturn(user);
        mvc.perform(put(userEndPoint + "/" + "10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "10",
                                "name": "lily",
                                "visitedCountries": []
                                }
                                """))
                .andExpect(status().isOk());
    }
}