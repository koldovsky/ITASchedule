package com.ita.entity.projections;

import org.springframework.data.rest.core.config.Projection;
import org.springframework.beans.factory.annotation.Value;
import com.ita.entity.User;

@Projection(name="userFullName", types = {User.class})
public interface UserFullName{
    String getFullName();
}