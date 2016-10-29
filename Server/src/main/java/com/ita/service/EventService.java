package com.ita.service;


import com.ita.dto.EventDto;
import com.ita.entity.Event;
import com.ita.entity.EventType;
import com.ita.entity.ITAGroup;
import com.ita.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EventService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventTypeRepository eventTypeRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AddressJpaRepository addressJpaRepository;

    @Autowired
    private ITAGroupRepository itaGroupRepository;


    public Event buildEvent(EventDto eventDto) {
        Event event = Event.newBuilder().setId(eventDto.getId())
                .setTitle(eventDto.getTitle())
                .setStartTime(LocalDateTime.parse(eventDto.getStartTime()))
                .setEndTime(LocalDateTime.parse(eventDto.getEndTime()))
                .setRoom(roomRepository.findByAddressAndNumber(addressJpaRepository.findByCodeName(eventDto.getAddressCodeName()), eventDto.getRoomNumber()))
                .setType(eventTypeRepository.findByType(eventDto.getType()))
                .setCreator(userRepository.findByFullName(eventDto.getCreatorFullName()))
                .setITAGroups(itaGroupRepository.findByTitleIn(eventDto.getGroupTitles()))
                .setUsers(userRepository.findByFullNameIn(eventDto.getUsersFullNames()))
                .build();
        return event;
    }

}
