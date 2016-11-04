package com.ita.repository;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @RestResource(path = "findByEmail", rel = "findByEmail")
    public User findByEmail(String email);
    public List<User> findByEmailIn(List<String> emails);

    public List<User> findByIdIn(List<Long> ids);



    String searchQueryConst = "Select u From User u where (LOWER(u.fullName) LIKE LOWER(CONCAT('%',:searchParam,'%'))" +
            " OR LOWER(u.email) LIKE LOWER(CONCAT('%',:searchParam,'%'))" +
            " OR LOWER(u.contactInfo) LIKE LOWER(CONCAT('%',:searchParam,'%')))";

    @Query(searchQueryConst + "AND (:r MEMBER OF u.roles) ")
    Page<User> getAllUsersBySearchParameterPage(@Param("r") Role r, @Param("searchParam")String searchParam, Pageable p);

    @Query(searchQueryConst + " AND (u.active=true) AND (:r MEMBER OF u.roles) ")
    Page<User> getAllUsersBySearchParameterActivePage(@Param("r") Role r, @Param("searchParam")String searchParam, Pageable p);

    public Page<User> findByRoles(List<Role> role, Pageable p);

    public List<User> findUserByEmail(String email);

    @RestResource(path = "find-active-users-by-role", rel = "find-active-users-by-role")
    public List<User> findByActiveTrueAndRoles(@Param("role") List<Role> role);

    @RestResource(path = "find-by-roles", rel = "find-by-roles")
    public List<User> findByRoles(List<Role> roles);



}