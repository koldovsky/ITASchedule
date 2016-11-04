package com.ita.controller;

import com.google.gson.Gson;
import com.ita.dto.EventDto;
import com.ita.entity.Event;
import com.ita.repository.EventRepository;
import com.ita.repository.ITAGroupRepository;
import com.ita.repository.UserRepository;
import com.ita.service.EventService;
import com.ita.utils.validators.EventValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class EventController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ITAGroupRepository itaGroupRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private EventValidator eventValidator;

    @RequestMapping(value = "/createEvent",
            method = {RequestMethod.POST,RequestMethod.PUT},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createEvent(@Valid @RequestBody EventDto eventDto,BindingResult bindingResult) {
        Event event = eventService.buildEvent(eventDto);
        eventValidator.validate(event,bindingResult);
        if(bindingResult.hasErrors()){
            String jsonValidationMessage = new Gson().toJson(bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(jsonValidationMessage);
        }
        eventRepository.save(event);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @RequestMapping(value = "/find-events/", method = RequestMethod.GET)
    public ResponseEntity<List<Event>> getAllEventsByParameters (@RequestParam(value = "users", required = false) List<Long> users,
                                                                    @RequestParam(value = "groups", required = false) List<Long> groups,
                                                                    @RequestParam(value = "rooms", required = false) List<Long> rooms
    ){
        List<Event> events = eventRepository.findEventsByUsersInAndGroupsInAndRoomIn(users,groups,rooms);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

}