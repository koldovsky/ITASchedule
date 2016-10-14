package com.ita.entity.projections;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "shortinfo", types = {User.class})
public interface UserShort {

    Long getId();

    String getFullName();

    Boolean getIsActive();

    List<Role> getRoles();

}