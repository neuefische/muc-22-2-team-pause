package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.model.Traveller;
import de.neuefische.backend.repository.MongoUserRepo;
import de.neuefische.backend.repository.TravellerRepo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class MongoUserControllerTest {
    String userEndPoint = "/api/user";
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private  MongoUserRepo mongoUserRepo;
    @Autowired
    private TravellerRepo travellerRepo;

    @BeforeAll
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity()).
                build();
    }

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
                                 """).with(csrf())

                )
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Traveller resultTraveller = objectMapper.readValue(travellerResult, Traveller.class);
        assertEquals("nick", resultTraveller.name());

    }

    @Test
    void delete_expect_status_isOk() throws Exception {
        mongoUserRepo.save(new MongoUser("1","a","123"));
        travellerRepo.save(new Traveller("1","a",new HashSet<>()));

        mvc.perform(delete(userEndPoint + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).with(csrf())
                )
                .andExpect(status().isOk());
    }

    @Test
    void login_expect_anonyymousUser() throws Exception {
        mvc.perform(post(userEndPoint + "/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "traveller":{"id":"","name":"anonymousUser","visitedCountries":[]},
                        "username":"anonymousUser"}
                        """));
    }

    @WithMockUser
    @Test
    void login_expect_ok() throws Exception {
        mvc.perform(post(userEndPoint + "/login").with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    void login_me_expect_ok_and_anonymousUser() throws Exception {
        mvc.perform(get(userEndPoint + "/login/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "traveller":{"id":"","name":"anonymousUser","visitedCountries":[]},
                        "username":"anonymousUser"}
                        """));
    }

    @WithMockUser("spring")
    @Test
    void login_me_expect_spring_user() throws Exception {
        mongoUserRepo.save(new MongoUser("0","spring","123"));
        travellerRepo.save(new Traveller("0","spring",new HashSet<>()));
        mvc.perform(get(userEndPoint + "/login/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "traveller":{"id":"0","name":"spring","visitedCountries":[]},
                        "username":"spring"}
                        """));
    }

    @Test
    void logout_expect_anonymousUser() throws Exception {
        mvc.perform(post(userEndPoint + "/logout")
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }


}