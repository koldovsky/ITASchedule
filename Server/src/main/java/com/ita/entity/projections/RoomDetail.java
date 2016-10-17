package com.ita.entity.projections;

import com.ita.entity.Address;
import com.ita.entity.Room;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "roomItem", types = {Room.class})
public interface RoomDetail {

    String getId();

    String getNumber();

    Address getAddress();

    @Value("#{target.address.codeName}")
    String getCodeName();

    Boolean getActive();

    @Value("#{target.address.city.name}")
    String getCity();
}
