package com.ita.controller;

import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import com.ita.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sdub on 13.10.2016.
 */
//@RequestMapping(value="/users/")
@RestController
public class UsersController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;
    private static Logger logger = LoggerFactory.getLogger(UsersController.class);
    private int page;

    @RequestMapping(value="/users/roles/{r}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String r){
        List<Role> roles = new ArrayList<>();
        try {
            Role role = Role.valueOf(r);
            roles.add(role);
        }
        catch (IllegalArgumentException e)
        {
            logger.info("Bad Role = " + roles);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<User> users = userService.findUsersByRole(roles);
        if(users.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value="/users/active/roles/{r}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getActiveUsersByRole(@PathVariable String r){
        List<Role> roles = new ArrayList<>();
        try {
            Role role = Role.valueOf(r);
            roles.add(role);
        }
        catch (IllegalArgumentException e)
        {
            logger.info("Bad Role = " + roles);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<User> users = userRepository.findByActiveTrueAndRoles(roles);
        if(users.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable(value = "id") Long id) {
        logger.info("geting user from database with id=" + id);
        return userService.findOne(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public User createNewUser(@PathVariable Long id, @RequestBody User user) {
        logger.info("Saving user, sending to service");
        return userService.saveAndFlush(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    @RequestMapping(value = "/user/{id}", method = RequestMethod.PATCH)
    public User createNewUser(@RequestBody User user) {
        logger.info("Updating user, sending to service");
        return userService.update(user);
    }

    @RequestMapping(value = "/search-users-pages/", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> getAllUsersBySearchParameter (@RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                                    @RequestParam(value = "role", defaultValue = "TEACHER", required = false) String role,
                                                                    @RequestParam(value = "active", defaultValue = "false", required = false) boolean activeOnly,
                                                                    @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                                    @RequestParam(value = "size", defaultValue = "5", required = false) int size,
                                                                    @RequestParam(value = "sortedField", defaultValue = "fullName", required = false) String sortedField,
                                                                    @RequestParam(value = "sortDirectionStr", defaultValue = "Asc", required = false) String sortDirectionStr
                                                                   ){
        Role r;
        try {
            r = Role.valueOf(role.toUpperCase());
        }
        catch (IllegalArgumentException e)
        {
            logger.info("Getting all users from database page - " + page/size);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Sort.Direction sortDirection = Sort.Direction.ASC;
        if ("desc".equalsIgnoreCase(sortDirectionStr)) {
            sortDirection = Sort.Direction.DESC;
        }

        Page<User> users = userService.getAllUsersBySearchParameterPage(activeOnly, r, search, new PageRequest(page,size,sortDirection,sortedField));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
