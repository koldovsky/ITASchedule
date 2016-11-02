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
import java.util.Set;

@Repository
@RepositoryRestResource(path = "users")
public interface UserRepository extends  JpaRepository<User, Long> {

    @RestResource(path = "findByName", rel = "findByName")
    public User findByFullName(String fullName);

    public List<User> findByFullNameIn(List<String> fullNames);

    @RestResource(path = "active-users", rel = "active-users")
    public List<User> findByActiveTrue();

    @RestResource(path = "find-by-roles", rel = "find-by-roles")
    public List<User> findByRoles(@Param("roles") List<Role> role);

    @RestResource(path = "find-active-users-by-role", rel = "find-active-users-by-role")
    public List<User> findByActiveTrueAndRoles(@Param("role") List<Role> role);

    public List<User> findUserByEmail(@Param("email") String email);

    public Page<User> findByActiveTrueAndRoles(@Param("role") List<Role> role, Pageable p);

//    public Page<User> findByActiveTrueAndRolesAndFullNameIgnoreCaseLike(@Param("role") List<Role> role, Pageable p, String likes);

    @Query("Select u From User u where LOWER(u.fullName) LIKE LOWER(CONCAT('%',:searchParam,'%'))" +
            " OR LOWER(u.email) LIKE LOWER(CONCAT('%',:searchParam,'%'))"+
            " OR LOWER(u.contactInfo) LIKE LOWER(CONCAT('%',:searchParam,'%'))")
    List<User> getAllReportsBySearchParam(@Param("searchParam") String searchTerm);

    String searchQuery = "Select u From User u where (LOWER(u.fullName) LIKE LOWER(CONCAT('%',:searchParam,'%'))" +
            " OR LOWER(u.email) LIKE LOWER(CONCAT('%',:searchParam,'%'))" +
            " OR LOWER(u.contactInfo) LIKE LOWER(CONCAT('%',:searchParam,'%')))";

    @Query(searchQuery + "AND (:r MEMBER OF u.roles) ")
    List<User> getAllUsersBySearchParameter(@Param("r") Role r, @Param("searchParam")String searchParam);

    @Query(searchQuery + "AND (:r MEMBER OF u.roles) ")
    Page<User> getAllUsersBySearchParameterPage(@Param("r") Role r, @Param("searchParam")String searchParam, Pageable p);

    @Query(searchQuery + " AND (u.active=true) AND (:r MEMBER OF u.roles) ")
    List<User> getAllUsersBySearchParameterActive(@Param("r") Role r, @Param("searchParam")String searchParam);

    @Query(searchQuery + " AND (u.active=true) AND (:r MEMBER OF u.roles) ")
    Page<User> getAllUsersBySearchParameterActivePage(@Param("r") Role r, @Param("searchParam")String searchParam, Pageable p);


    public Page<User> findByRoles(@Param("role") List<Role> role, Pageable p);

}