package com.ita.entity.projections;

import com.ita.entity.Role;
import com.ita.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "teacherAnonymous", types = {User.class})
public interface TeacherAnonymous {

    String getFullName();

    List<Role> getRoles();

    String getEmail();

    Boolean getActive();

}
