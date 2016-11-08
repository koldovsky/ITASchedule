package com.ita.service;

import com.ita.entity.Role;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        return userRepository.findAll();
    }

    @Override
    public List<User>findUsersByRoleIsActive(List<Role> roles){
        return userRepository.findByActiveTrueAndRoles (roles);
    }

    @Override
    public List<User> findUsersByRole(List<Role> roles) {
        return userRepository.findByRoles(roles);
    }

    @Override
    public User findUserByFullName(String name) {
        return userRepository.findByFullName(name);
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
    public User update(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User saveAndFlush(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public Page <User> getAllUsersBySearchParameterPage (boolean activeOnly, Role r, String search, Pageable p){
        if (activeOnly) {
            return userRepository.getAllUsersBySearchParameterActivePage(r, search,p);
        } else {
            return userRepository.getAllUsersBySearchParameterPage(r, search, p);
        }
   }
}
