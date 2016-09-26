package com.ita.repository;

import com.ita.entity.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "eventtypes")
public interface EventTypeRepository extends JpaRepository<EventType, Long> {

}
