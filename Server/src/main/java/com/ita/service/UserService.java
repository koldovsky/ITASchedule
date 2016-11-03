package com.ita.service;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;


public interface UserService {

    public List<User> findAll() ;

    User findOne(Long id);

    public List<User> findAll(Sort sort) ;

    public Page<User> findAll(Pageable pageable) ;

    public User saveAndFlush(User user) ;

    public User update(User user);

    public User findUserByEmail(String email);

    public void delete (User user);

    public User findUserByName(String fullName);

    public Page<User> findAll(int pageNumber, int pageCapacity);

    Page<User>findUsersByRoleIsActive(List<Role> roles, int pageNumber, int pageSize, Sort.Direction sortDirection, String sortField);

    Page<User>findUsersByRole(List<Role> roles, int pageNumber, int pageSize, Sort.Direction sortDirection, String sortField);
}
