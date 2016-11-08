package com.ita.service;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface UserService {

    List<User> findAll() ;

    User findOne(Long id);

    User saveAndFlush(User user) ;

    User update(User user);

    User findUserByEmail(String email);

    List<User>findUsersByRoleIsActive(List<Role> roles);

    void delete (User user);

    List<User>findUsersByRole(List<Role> roles);

    Page <User> getAllUsersBySearchParameterPage (boolean activeOnly, Role r, String search, Pageable p);

    public User findUserByFullName(String name);

 }
