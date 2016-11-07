package com.ita.entity.projections;


import com.ita.entity.Room;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "roomAnonymous",types = {Room.class})
public interface RoomAnonymous {

    String getNumber();

    @Value("#{target.address.active}")
    Boolean getAddressActive();

    @Value("#{target.address.codeName}")
    String getAddressCodeName();

    Boolean getActive();

}
