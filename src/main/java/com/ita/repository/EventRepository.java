package com.ita.repository;

import com.ita.entity.Event;
import com.ita.entity.projections.EventDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "events", excerptProjection = EventDetail.class)
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findById(Long id);

    List<Event> findByRoom(Long id_room);
}