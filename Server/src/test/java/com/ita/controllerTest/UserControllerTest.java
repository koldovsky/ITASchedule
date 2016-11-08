package com.ita.controllerTest;


import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.service.UserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
    public void getUsersByRoleTest() throws Exception {
        this.mockMvc.perform(get("/users/roles/TEACHER")
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andExpect(status().isOk());
    }

    @Test
    public void getActiveUsersByRoleTest() throws Exception {
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



    @After
    public void afterTest(){
        userService.delete(user);
    }

}
