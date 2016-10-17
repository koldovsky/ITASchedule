package com.ita.controller;

import com.google.gson.Gson;
import com.ita.dto.EventDto;
import com.ita.entity.Event;
import com.ita.entity.ITAGroup;
import com.ita.repository.*;
import com.ita.utils.validators.EventValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class EventController {
    @Autowired
    private EventTypeRepository eventTypeRepository;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    ITAGroupRepository itaGroupRepository;
    @Autowired
    private AddressJpaRepository addressJpaRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventValidator eventValidator;

    @RequestMapping(value = "/createEvent",
            method = {RequestMethod.POST,RequestMethod.PUT},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createEvent(@Valid @RequestBody EventDto eventDto,BindingResult bindingResult) {
        Event event = eventDto.buildEvent(userRepository,eventTypeRepository,roomRepository,addressJpaRepository,itaGroupRepository);
        eventValidator.validate(event,bindingResult);
        if(bindingResult.hasErrors()){
            String jsonValidationMessage = new Gson().toJson(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(jsonValidationMessage);
        }
        eventRepository.save(event);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @RequestMapping(value = "/deleteEvent",
            method = RequestMethod.DELETE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteEvent(@Valid @RequestBody EventDto eventDto,BindingResult bindingResult) {
        Event event = eventDto.buildEvent(userRepository,eventTypeRepository,roomRepository,addressJpaRepository,itaGroupRepository);
        eventValidator.validate(event,bindingResult);
        if(bindingResult.hasErrors()){
            String jsonValidationMessage = new Gson().toJson(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(jsonValidationMessage);
        }
        eventRepository.delete(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}