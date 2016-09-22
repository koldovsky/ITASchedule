package com.ita.entity.projections;

import com.ita.entity.Address;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "AddressDetail", types = {Address.class})
public interface AddressDetail {
}
