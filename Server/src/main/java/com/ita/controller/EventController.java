package com.ita.controller;

import com.ita.dto.EventDto;
import com.ita.entity.Event;
import com.ita.repository.AddressJpaRepository;
import com.ita.repository.EventRepository;
import com.ita.repository.EventTypeRepository;
import com.ita.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class EventController {
    @Autowired
    EventTypeRepository eventTypeRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    AddressJpaRepository addressJpaRepository;

    @Autowired
    EventRepository eventRepository;


    @RequestMapping(value = "/createEvent",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> createEvent(@Valid @RequestBody EventDto eventDto) {
        Event newEvent = eventDto.buildEvent(eventTypeRepository,roomRepository,addressJpaRepository,eventRepository);
        eventRepository.save(newEvent);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}