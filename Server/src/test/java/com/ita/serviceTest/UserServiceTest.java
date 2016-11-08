package com.ita.serviceTest;


import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import com.ita.service.UserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    public static final String TESTFULLNAME = "test123";
    private User testUser;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUpToUserObject() {
        testUser=new User();
        testUser.setFullName(TESTFULLNAME);
        testUser.setEmail("TheTestEmail@gmail.com");
        testUser.setActive(true);
        testUser.setContactInfo("+380679167305");
        Role teacher = Role.TEACHER;
        List<Role> roles = new ArrayList<Role>();
        roles.add(teacher);
        testUser.setRoles(roles);
    }

    @Test
    public void testCreateUser() {
        userService.saveAndFlush(testUser);
        User user = userService.findUserByFullName(TESTFULLNAME);
        assertTrue("username not expected " + user.getFullName(), TESTFULLNAME.equals(user.getFullName()) );
        assertTrue("email not expected " + user.getEmail(), testUser.getEmail().equals(user.getEmail()) );
        assertTrue("contact info expected " + user.getContactInfo(), testUser.getContactInfo().equals(user.getContactInfo()) );
        assertTrue("status expected " + user.isActive(), testUser.isActive()==user.isActive() );
    }

    @Test
    public void userSaveTest() {
        userService.saveAndFlush(testUser);
        assertEquals(testUser.getId(), userService.findUserByEmail(testUser.getEmail()).getId());
    }

    @Test
    public void testUserNotFound() {
        User user = userService.findUserByFullName("doesnotexist");
        assertNull("User must be null", user);
    }



    public User createUser(String fullName, String email, Boolean active) {
        User tempUser=new User();
        tempUser.setFullName(fullName);
        tempUser.setEmail("TheTestEmail@gmail.com");
        tempUser.setActive(true);
        tempUser.setContactInfo("+380679167305");
        Role teacher = Role.TEACHER;
        List<Role> roles = new ArrayList<Role>();
        roles.add(teacher);
        tempUser.setRoles(roles);
        return tempUser;
    }

    @After
    public void deleteUser() {
        userService.delete(testUser);
    }


}
