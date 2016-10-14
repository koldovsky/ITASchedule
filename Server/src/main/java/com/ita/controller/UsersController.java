package com.ita.controller;

import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by sdub on 13.10.2016.
 */
@RestController
@RequestMapping(value="/users")
public class UsersController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value="/roles/{r}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getUsers(@PathVariable String r){
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

    @RequestMapping(value="/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getUsers(){
        List<Role> r = new ArrayList<>();
        r.add(Role.ADMINISTRATOR);
        List<User> users = userRepository.findByRoles(r);
        if(users.isEmpty()){
            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
}
