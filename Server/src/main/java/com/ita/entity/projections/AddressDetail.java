package com.ita.entity.projections;

import com.ita.entity.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalTime;

@Projection(name = "detailed", types = {Address.class})
public interface AddressDetail {

    String getAddress();

    String getCodeName();

    LocalTime getWorkingHoursStart();

    LocalTime getWorkingHoursEnd();

    Boolean getIsActive();

    @Value("#{target.city.name}")
    String getCity();
}
