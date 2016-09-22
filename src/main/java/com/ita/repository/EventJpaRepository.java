package com.ita.repository;

import com.ita.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path="events")
public interface EventJpaRepository extends JpaRepository <Event,Long> {

}
