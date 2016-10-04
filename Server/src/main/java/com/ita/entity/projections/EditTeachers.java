package com.ita.entity.projections;

import com.ita.entity.Event;
import com.ita.entity.ITAGroup;
import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "editTeachers", types = {User.class})
public interface EditTeachers {

    Long getId();

    String getFullName();

    String getEmail();

    String getContactInfo();

    Boolean getIsActive();

    List<ITAGroup> getGroups();

    List<Event> getEvents();

    List<Role> getRole();
}
