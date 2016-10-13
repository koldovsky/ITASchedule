package com.ita.handler;

import com.ita.entity.User;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(User.class)
public class UserEventHandler {
    @HandleBeforeCreate
    public void handleBeforeCreate(User user) {
        if(!user.isActive()) {
            throw new IllegalArgumentException("New user must be 'active'");
        }
    }
}
