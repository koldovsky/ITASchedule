package com.ita.entity.projections;

import com.ita.entity.Address;
import com.ita.entity.Room;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "RoomDetail", types = {Room.class})
public interface RoomDetail {
    Integer getNumber();
    Address getAddress();
    Boolean getActive();
}
