package com.ita.controller;

import com.ita.dto.EventDto;
import com.ita.dto.ITAGroupDto;
import com.ita.entity.Event;
import com.ita.entity.ITAGroup;
import com.ita.service.impl.EventService;
import com.ita.service.impl.ITAGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController{

    @Autowired
    private EventService eventService;

    @RequestMapping(value="/createEvent",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> createEvent(@RequestBody EventDto eventDto){
        eventService.createEvent(eventDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}