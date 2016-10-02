package com.ita.entity.projections;

import com.ita.entity.Event;
import com.ita.entity.ITAGroup;
import com.ita.entity.Permission;
import com.ita.entity.Teacher;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "editTeachers", types = {Teacher.class})
public interface EditTeachers {

    Long getId();

    String getFullName();

    String getEmail();

    String getContactInfo();

    Boolean getIsActive();

    List<ITAGroup> getGroups();

    List<Event> getEvents();

    List<Permission> getPermissions();
}
