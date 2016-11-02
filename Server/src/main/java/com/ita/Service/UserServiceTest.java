package com.ita.Service;


import com.ita.entity.Role;
import com.ita.entity.User;
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


/*    @Test
    public void testFindUserByUsername() {
        User user = userService.findUserByName(TESTFULLNAME);
        assertNotNull("User is mandatory",user);
        assertTrue("Unexpected user " + user.getFullName(), user.getFullName().equals(TESTFULLNAME));
    }*/

    @Test
    public void testUserNotFound() {
        User user = userService.findUserByName("doesnotexist");
        assertNull("User must be null", user);
    }

    @Test
    public void testCreateValidUser() {
        userService.saveAndFlush(testUser);
        User user = userService.findUserByName(TESTFULLNAME);

        assertTrue("username not expected " + user.getFullName(), TESTFULLNAME.equals(user.getFullName()) );
        assertTrue("email not expected " + user.getEmail(), testUser.getEmail().equals(user.getEmail()) );
        assertTrue("contact info expected " + user.getContactInfo(), testUser.getContactInfo().equals(user.getContactInfo()) );
        assertTrue("status expected " + user.isActive(), testUser.isActive()==user.isActive() );
//        assertTrue("role expected " + user.getRoles(), testUser.getRoles().contains(user.getRoles()));
    }

    @Test/*(expected = IllegalArgumentException.class)*/
    public void testBlankUser() {
        userService.saveAndFlush(createUser("", "test@gmail.com",true));
        User user = userService.findUserByEmail(testUser.getEmail());
        assertFalse("failed creating a user with blank name", testUser.getEmail().equals(user.getEmail()) );

    }

/*    @Test(expected = IllegalArgumentException.class)
    public void testUsernameLength() {
        userService.saveAndFlush(createUser("test", "test@gmail.com",true));
    }*/

/*
    @Test(expected = IllegalArgumentException.class)
    public void testUsernameAvailable() {
        userService.saveAndFlush(testUser);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testBlankEmail() {
        userService.saveAndFlush(createUser("test001","", true));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidEmail() {
        userService.saveAndFlush(createUser("test001", "test",true));
    }
*/

}
