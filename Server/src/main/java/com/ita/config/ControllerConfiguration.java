package com.ita.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolationException;

/**
 * Created by sdub on 13.10.2016.
 */
//    @ControllerAdvice
    public class ControllerConfiguration {

        @ExceptionHandler(ConstraintViolationException.class)
        @ResponseStatus(value= HttpStatus.BAD_REQUEST, reason="Invalid Data sent to server")
        public void notValid() {
            //add some code if you'd like
        }

    }
