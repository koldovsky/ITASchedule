package com.ita.controller;


import com.google.gson.Gson;
import com.ita.Service.UserService;
import com.ita.entity.Role;
import com.ita.entity.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
@ActiveProfiles("test")
//@ContextConfiguration(classes=ItaScheduleApplication.class)
//@ContextConfiguration(classes={TestConfiguration.class, RootContextConfig.class, ServletContextConfig.class})
//@SpringApplicationConfiguration(classes = ItaScheduleApplication.class)

public class UserControllerTest {

    private User user;

    private MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;
    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

/*    @Autowired
    private UserRepository userRepository;*/

    @Autowired
    private UserService userService;

    @Autowired
    private WebApplicationContext wac;

    @Before
    public void init()  {
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Before
    public void setUpToUserObject() {
        user=new User();
        user.setFullName("Test Name");
        user.setEmail("TheTestEmail@gmail.com");
        user.setActive(true);
        user.setContactInfo("+380679167305");
        Role teacher = Role.TEACHER;
        List<Role> roles = new ArrayList<>();
        roles.add(teacher);
        user.setRoles(roles);
    }

    @Test
    public void getUsersFromRepoTest() throws Exception {
        this.mockMvc.perform(get("/users/")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk());
    }

    @Test
    public void getAllUsersTest() throws Exception {
        this.mockMvc.perform(get("/allusers/")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk());
    }

    @Test
    public void getUsersByRoleTest() throws Exception {
        this.mockMvc.perform(get("/users/roles/TEACHER")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk());
    }

    @Test
    public void getActiveUsersbyRoleTest() throws Exception {
        this.mockMvc.perform(get("/users/active/roles/TEACHER")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk());
    }

    @Test
    public void getUserByIdTest() throws Exception {
        this.mockMvc.perform(get("/user/1")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.fullName").value("Kononchuk Bohdan"));
    }

/*    @Test
    public void updateUserTest() throws Exception {
        this.mockMvc.perform(patch("/user/1")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.fullName").value("Kononchuk Bohdan"));
    }*/


    @Test
    public void testSaveTest() {
        userService.saveAndFlush(user);
        assertEquals(user.getId(), userService.findUserByEmail(user.getEmail()).getId());
    }

    @Test
    public void testSaveRepoTest() throws Exception {
        System.out.println("testSaveRepoTest started");
        String userStr = new Gson().toJson(user);
        System.out.println("userStr created - " + userStr);
        System.out.println("perfoming mockMvc ....");
        this.mockMvc.perform(post("/user/")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8"))
                .content(this.json(user))
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"));
//                .andExpect(content().json(userStr));
        System.out.println("AssertEquals....");
        assertEquals(user.getId(), userService.findUserByEmail(user.getEmail()).getId());
        System.out.println("The end....");

    }


    private String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write( o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }

    @After
    public void afterTest(){
        userService.delete(user);
    }

}
