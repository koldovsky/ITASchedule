package com.ita.entity.projections;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "userslist", types = {User.class})
public interface TacherList {

        String getId();

        String getFullName();

        Boolean getIsActive();

        String getContactInfo();

        String getEmail();

        List<Role> getRoles();

    }