package com.ita.entity.projections;

import com.ita.entity.Room;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "short", types = {Room.class})
public interface RoomDefault {
    Integer getNumber();
    Boolean getActive();
}
