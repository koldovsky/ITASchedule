package com.ita.controller;

import com.ita.Service.UserService;
import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @RequestMapping(value = "/allusers", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAll() {
        logger.info("Getting all users from database");
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value="/users/roles/{r}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String r){
        List<Role> roles = new ArrayList<>();
        try {
            Role role = Role.valueOf(r);
            roles.add(role);
        }
        catch (IllegalArgumentException e)
        {
            return new ResponseEntity<List<User>>(HttpStatus.BAD_REQUEST);
        }
        List<User> users = userRepository.findByRoles(roles);
        if(users.isEmpty()){
            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
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

    @RequestMapping(value="/users/active", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getActiveUsers(){
        List<User> users = userRepository.findByActiveTrue();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable(value = "id") Long id) {
        logger.info("geting user from database with id=" + id);
        User user = userService.findOne(id);
        return user;
    }

    @RequestMapping(value = "/user/", method = RequestMethod.POST)
    public User createNewUser(@PathVariable Long id, @RequestBody User user) {
        logger.info("Saving user, sending to service");
        return userService.saveAndFlush(user);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PATCH)
    public User createNewUser(@RequestBody User user) {
        logger.info("Updating user, sending to service");
        return userService.update(user);
    }

    @RequestMapping(value = "/allusers/", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> getPage(@PathVariable(value = "page") int page, @PathVariable(value = "capacity") int capacity) {
        logger.info("Getting all users from database page - " + page/capacity);
        Page<User> users = userService.findAll(page,capacity);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/active-sorted-users/", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> getActiveAndSortedUsers(@RequestParam("page") int page,
                                                                    @RequestParam("size") int size,
                                                                    @RequestParam("role") String role,
                                                                    @RequestParam("sortedField") String sortedField,
                                                                    @RequestParam("sortDirectionStr") String sortDirectionStr) {
        List<Role> roles = new ArrayList<>();
        try {
            Role r = Role.valueOf(role);
            roles.add(r);
        }
        catch (IllegalArgumentException e)
        {
            return new ResponseEntity<Page<User>>(HttpStatus.BAD_REQUEST);
        }
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if (sortDirectionStr.equalsIgnoreCase("desc")) {
            sortDirection = Sort.Direction.DESC;
        }
        logger.info("Getting all users from database page - " + page/size);
        Page<User> users = userService.findUsersByRoleIsActive(roles,page,size, sortDirection,sortedField);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/sorted-users/", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> getSortedUsers(@RequestParam("page") int page,
                                                              @RequestParam("size") int size,
                                                              @RequestParam("role") String role,
                                                              @RequestParam("sortedField") String sortedField,
                                                              @RequestParam("sortDirectionStr") String sortDirectionStr) {
        List<Role> roles = new ArrayList<>();
        try {
            Role r = Role.valueOf(role);
            roles.add(r);
        }
        catch (IllegalArgumentException e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Sort.Direction sortDirection = Sort.Direction.ASC;
        if ("desc".equalsIgnoreCase(sortDirectionStr)) {
            sortDirection = Sort.Direction.DESC;
        }
        logger.info("Getting all users from database page - " + page/size);
        Page<User> users = userService.findUsersByRole(roles,page,size, sortDirection,sortedField);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @RequestMapping(value = "/search-users/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsersBySearchParameter (@RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                                    @RequestParam(value = "role", defaultValue = "TEACHER", required = false) String role,
                                                                    @RequestParam(value = "active", defaultValue = "false", required = false) boolean active
                                                                   ){
        Role r;
        List<User> users;
        Set<Role> roles = new HashSet<>();
        try {
            r = Role.valueOf(role.toUpperCase());
            roles.add(r);
        }
        catch (IllegalArgumentException e)
        {
            return new ResponseEntity<List<User>>(HttpStatus.BAD_REQUEST);
        }
        if (active) {
            users = userRepository.getAllUsersBySearchParameterActive(r, search);
        } else {
            users = userRepository.getAllUsersBySearchParameter(r, search);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @RequestMapping(value = "/search-users-pages/", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> getAllUsersBySearchParameter (@RequestParam(value = "search", defaultValue = "", required = false) String search,
                                                                    @RequestParam(value = "role", defaultValue = "TEACHER", required = false) String role,
                                                                    @RequestParam(value = "active", defaultValue = "false", required = false) boolean active,
                                                                    @RequestParam(value = "page", defaultValue = "0", required = false) int page,
                                                                    @RequestParam(value = "size", defaultValue = "5", required = false) int size,
                                                                    @RequestParam(value = "sortedField", defaultValue = "fullName", required = false) String sortedField,
                                                                    @RequestParam(value = "sortDirectionStr", defaultValue = "Asc", required = false) String sortDirectionStr
                                                                   ){
        Role r;
        Page<User> users;
        Set<Role> roles = new HashSet<>();
        try {
            r = Role.valueOf(role.toUpperCase());
            roles.add(r);
        }
        catch (IllegalArgumentException e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Sort.Direction sortDirection = Sort.Direction.ASC;
        if ("desc".equalsIgnoreCase(sortDirectionStr)) {
            sortDirection = Sort.Direction.DESC;
        }
        logger.info("searching users from database page - " + page/size);
        Pageable p = new PageRequest(page,size,sortDirection,sortedField);
        if (active) {
            users = userRepository.getAllUsersBySearchParameterActivePage(r, search,p);
        } else {
            users = userRepository.getAllUsersBySearchParameterPage(r, search, p);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }






}
