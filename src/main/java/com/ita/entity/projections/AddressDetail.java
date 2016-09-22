package com.ita.entity.projections;

import com.ita.entity.Address;
import com.ita.entity.City;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "AddressDetail", types = {Address.class})
public interface AddressDetail {

    String getAddress();

    String getCodeName();

    String getWorkingHoursStart();

    String getWorkingHoursEnd();

    Boolean getActive();

    City getCity();
}
