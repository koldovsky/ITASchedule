package com.ita.repository;

import com.ita.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByFullName(String fullName);

}
