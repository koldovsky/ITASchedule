package com.ita.utils.validators;

import com.ita.constants.ErrorConstants;
import com.ita.entity.Event;
import com.ita.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class EventValidator implements Validator {


    @Autowired
    EventRepository eventRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Event.class.equals(aClass);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        Event event = (Event) obj;

        if (event.getTitle() == null) {
            errors.rejectValue("title", ErrorConstants.BLANK_TITLE);
        }
        if (event.getType() == null) {
            errors.rejectValue("type", ErrorConstants.MISIING_TYPE);
        }
        if (event.getRoom() == null) {
            errors.rejectValue("room", ErrorConstants.MISSING_ROOM);
        }
        if (event.getEndTime().isBefore(event.getStartTime())) {
            errors.reject("Start time is before end time");
        }
    }

}
