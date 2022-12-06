package de.neuefische.backend.controller;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TravellerControllerTest {

    String travellerEndPoint = "/api/traveller";

    @Autowired
    private MockMvc mvc;
    @Autowired
    private WebApplicationContext context;

    /*@BeforeAll
    public void setup(){
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity()).
                build();
    }*/

    @Order(1)
    @WithMockUser("spring")
    @Test
    void listUsers_expect_empty_list() throws Exception {
        mvc.perform(get(travellerEndPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Order(2)
    @WithMockUser("spring")
    @Test
    void update_expect_NotFound_status() throws Exception {
        mvc.perform(put(travellerEndPoint + "/" + "10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "0",
                                "name": "nick",
                                "password": ""
                                }
                                """))
                .andExpect(status().isNotFound());
    }

}