package com.ita.controller;

import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by sdub on 13.10.2016.
 */
@RestController
public class UsersController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value="/users/{role}", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getUsers(@RequestBody Role role){
        List<User> users = userRepository.findByRole(role);
        if(users.isEmpty()){
            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
}
