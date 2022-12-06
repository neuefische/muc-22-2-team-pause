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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class MongoUserControllerTest {
    String userEndPoint = "/api/user";
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mvc;

    @Test
    void addUser_expect_traveller_status_isOk() throws Exception {
        String travellerResult = mvc.perform(post(userEndPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                   "username": "nick",
                                   "visitedCountries": [],
                                   "password": "test123"
                                }
                                 """))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Traveller resultTraveller = objectMapper.readValue(travellerResult, Traveller.class);
        assertEquals("nick",resultTraveller.name());

    }

    @Test
    void delete_expect_status_isOk() throws Exception {
        mvc.perform(delete(userEndPoint+"/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}