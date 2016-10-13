package com.ita.repository;

import com.ita.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "roles")
public interface RoleRepository extends JpaRepository<Role, Long> {

/*    @RestResource(path = "findByRole", rel = "findByRole")
    public List<User> findByFullName(Role role);*/
}