package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Traveller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TravellerControllerTest {

    String userEndPoint = "/api/traveller";

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

        Traveller actualResult = objectMapper.readValue(result.getResponse().getContentAsString(), Traveller.class);

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

        Traveller resultUser = objectMapper.readValue(userAsString, Traveller.class);
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

}