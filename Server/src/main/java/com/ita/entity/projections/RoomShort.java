package com.ita.entity.projections;

import com.ita.entity.Room;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by sdub on 14.10.2016.
 */
@Projection(name = "shortinfo", types = {Room.class})
public interface RoomShort {

    Long getId();

    String getNumber();

    @Value("#{target.address.codeName}")
    String getCodeName();

    Boolean getActive();
    
}
