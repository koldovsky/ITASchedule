package com.ita.repository;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {

    @RestResource(path = "findByName", rel = "findByName")
    public User findByFullName(String fullName);

    @RestResource(path = "activeusers", rel = "names")
    public List<User> findByIsActiveTrue();

    @RestResource(path = "findbyroles", rel = "findbyroles")
    public List<User> findByRoles(@Param("roles") List<Role> roles);

}
