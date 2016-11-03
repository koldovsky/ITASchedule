package com.ita.service;

import com.ita.entity.User;
import com.ita.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashSet;
import java.util.Set;

@Transactional
@Service
public class ITAUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        User user =  userRepository.findByEmail(s);
        if(user == null) {
            throw new UsernameNotFoundException("No such user");
        }
        boolean isConfirmed = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        Set<GrantedAuthority> roles = new HashSet();
        user.getRoles().forEach(role -> {
            roles.add(new SimpleGrantedAuthority(role.getAuthority()));
        });

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                isConfirmed, accountNonExpired, credentialsNonExpired, user.isActive(), roles);

    }
}
