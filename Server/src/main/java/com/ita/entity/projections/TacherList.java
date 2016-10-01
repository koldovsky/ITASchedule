package com.ita.entity.projections;

import com.ita.entity.Teacher;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "brief", types = {Teacher.class})
public interface TacherList {

        String getFullName();

        Boolean getIsActive();

        String getContactInfo();

        String getEmail();

    }