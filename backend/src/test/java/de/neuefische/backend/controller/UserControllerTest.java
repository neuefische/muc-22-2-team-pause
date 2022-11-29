package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.User;
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
class UserControllerTest {

    String endPoint = "/api/user";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void listUsers_expect_empty_list() throws Exception {
        mvc.perform(get(endPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    void addUser_expect_valid_user_and_an_id() throws Exception {
        MvcResult result = mvc.perform(post(endPoint)
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

        assertInstanceOf(User.class, actualResult);
        assertFalse(actualResult.id().isEmpty());
        assertFalse(actualResult.id().isBlank());
    }


    @DirtiesContext
    @Test
    void expectSuccessfulDelete() throws Exception {
        String textResult = mvc.perform(
                        post(endPoint)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"name":"Max Mustermann"}
                                        """)
                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        User textResultUser = objectMapper.readValue(textResult, User.class);
        String id = textResultUser.id();

        mvc.perform(delete(endPoint + "/"+id))
                .andExpect(status().isOk());
    }
}