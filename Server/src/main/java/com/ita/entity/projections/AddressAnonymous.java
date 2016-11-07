package com.ita.entity.projections;


import com.ita.entity.Address;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "addressAnonymous",types = {Address.class})
public interface AddressAnonymous {

    String getCodeName();

    @Value("#{target.city.name}")
    String getCityName();

    Boolean getActive();
}
