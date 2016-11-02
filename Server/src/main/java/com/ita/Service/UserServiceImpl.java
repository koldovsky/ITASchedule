package com.ita.Service;


import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    @Override
    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public List<User> findAll(Sort sort) {
        return userRepository.findAll(sort);
    }

    @Override
    public Page<User> findAll(int pageNumber, int pageSize) {
        Pageable p = new PageRequest(pageNumber,pageSize,Sort.Direction.ASC,"fullName");
        Page page = userRepository.findAll(p);
        return page;
    }

    public Page<User>findUsersByRoleIsActive(List<Role> roles, int pageNumber, int pageSize, Sort.Direction sortDirection, String sortField){
        Pageable p = new PageRequest(pageNumber,pageSize,sortDirection,sortField);
        Sort sort = new Sort(sortDirection, sortField);
        Page page = userRepository.findByActiveTrueAndRoles (roles, p);

        return page;
    }

    public Page<User>findUsersByRole(List<Role> roles, int pageNumber, int pageSize, Sort.Direction sortDirection, String sortField){
        Pageable p = new PageRequest(pageNumber,pageSize,sortDirection,sortField);
        Sort sort = new Sort(sortDirection, sortField);
        Page page = userRepository.findByRoles (roles, p);

        return page;
    }


    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User saveAndFlush(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public User findUserByEmail(String email) {
        try {
            List<User> temp = userRepository.findUserByEmail(email);
            return temp.get(0);
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    @Override
    public User findUserByName(String fullName) {
        try {
            User user= userRepository.findByFullName(fullName);
            return user;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    public User update(User user) {
        return userRepository.saveAndFlush(user);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}
