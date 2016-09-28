package com.ita.repository;

import com.ita.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "cities")
public interface CityRepository extends JpaRepository<City, Long> {

}
