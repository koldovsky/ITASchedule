package com.ita.repository;

import com.ita.entity.Event;
import com.ita.entity.User;
import com.ita.entity.projections.EventDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource(path = "events", excerptProjection = EventDetail.class)
public interface EventRepository extends JpaRepository<Event, Long>{

    List<Event> findById(Long id);
    List<Event> findByRoom(Long id_room);

    @RestResource(path = "find-event-by", rel = "find-event-by")
    @Query("SELECT e FROM Event e LEFT JOIN e.users u LEFT JOIN e.ITAGroups g LEFT JOIN e.room r" +
            " WHERE u.id IN (:users) AND g.id in (:groups) AND r.id in (:rooms)")
    List<Event> findEventsByUsersInAndGroupsInAndRoomIn(@Param("users") List<Long> users, @Param("groups") List<Long> groups, @Param("rooms") List<Long> rooms);

}
