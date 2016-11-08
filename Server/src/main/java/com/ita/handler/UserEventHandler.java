package com.ita.handler;

import com.ita.controller.UsersController;
import com.ita.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RepositoryEventHandler(User.class)
public class UserEventHandler {

    private static Logger logger = LoggerFactory.getLogger(UsersController.class);

    @HandleBeforeSave
    public void handleBeforeSave(User user) {
        logger.info("handleBeforeSave");
        if(user.getFullName()==null||user.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Name can't be empty");
        }

        if(user.getEmail()==null||user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email can't be empty");
        }

        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        String email = user.getEmail();
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        boolean r = matcher.matches();
        if(!r) {
            throw new IllegalArgumentException("Email isn't valid");
        }
    }

    @HandleBeforeCreate
    public void handleBeforeCreate(User user) {
        logger.info("handleBeforeCreate");
        if(user.getFullName()==null||user.getFullName().isEmpty()) {
            throw new IllegalArgumentException("Name can't be empty");
        }

        if(user.getEmail()==null||user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email can't be empty");
        }

        String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        String email = user.getEmail();
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        boolean r = matcher.matches();
        if(!r) {
            throw new IllegalArgumentException("Email isn't valid");
        }
    }
}
