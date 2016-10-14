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
        System.out.println("Before User create");
        if(user.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Name can't be empty");
        }

        if(user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email can't be empty");
        }

    }
}
