package com.ita.repository;

import com.ita.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "permissions")
public interface PermissionJpaRepository extends JpaRepository<Permission, Long>{

}
