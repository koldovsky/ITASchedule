package com.ita.repository;

import com.ita.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "locations")
public interface AddressJpaRepository extends JpaRepository<Address, Long> {

}
