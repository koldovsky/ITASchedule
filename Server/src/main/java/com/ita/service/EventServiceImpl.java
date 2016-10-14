package com.ita.service;

import com.ita.dto.EventDto;
import com.ita.entity.Event;

import com.ita.repository.*;
import com.ita.service.impl.EventService;

import com.ita.utils.converters.LocalDateAttributeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Convert;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;
    @Autowired
    AddressJpaRepository addressJpaRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    EventTypeRepository eventTypeRepository;


    public Event buildEvent(EventDto eventDto) {
        Event newEvent = new Event();
        newEvent.setTitle(eventDto.getTitle());
        newEvent.setUsers(eventDto.getTeacherList());
        newEvent.setCreator(eventDto.getCreator());
        newEvent.setITAGroups(eventDto.getItaGroups());
        newEvent.setType(eventTypeRepository.findByType(eventDto.getType()));
        newEvent.setRoom(roomRepository.findByAddressAndNumber(addressJpaRepository.findByCodeName(eventDto.getAddressCodeName()),eventDto.getRoomNumber()));
        newEvent.setStartTime(LocalDateTime.parse(eventDto.getStartTime()));
        newEvent.setEndTime(LocalDateTime.parse(eventDto.getEndTime()));
        return newEvent;
    }

    @Override
    public EventDto createEvent(EventDto eventDto) {
        Event newEvent = buildEvent(eventDto);
        eventRepository.save(newEvent);
        return eventDto;
    }
}
