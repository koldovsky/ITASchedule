package com.ita.repository;

import com.ita.entity.Room;
import com.ita.entity.projections.RoomDefault;
import com.ita.entity.projections.RoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "rooms", excerptProjection = RoomDefault.class)
public interface RoomJpaRepository extends JpaRepository<Room, Long> {
}
