package com.ita.dto;

import com.ita.entity.*;
import com.ita.repository.AddressJpaRepository;
import com.ita.repository.EventRepository;
import com.ita.repository.EventTypeRepository;
import com.ita.repository.RoomRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class EventDto {


    @NotNull
    private String title;
    @NotNull
    private List<User> teacherList;
    @NotNull
    private User creator;

    private List<ITAGroup> itaGroups;
    @NotNull
    private String type;
    @NotNull
    private String roomNumber;
    @NotNull
    private String addressCodeName;
    @NotNull
    private String startTime;
    @NotNull
    private String endTime;



    public Event buildEvent(EventTypeRepository eventTypeRepository,RoomRepository roomRepository,AddressJpaRepository addressJpaRepository,EventRepository eventRepository) {
        Event newEvent = new Event();
        newEvent.setTitle(title);
        newEvent.setUsers(teacherList);
        newEvent.setCreator(creator);
        newEvent.setITAGroups(itaGroups);
        newEvent.setType(eventTypeRepository.findByType(type));
        newEvent.setRoom(roomRepository.findByAddressAndNumber(addressJpaRepository.findByCodeName(addressCodeName),roomNumber));
        newEvent.setStartTime(LocalDateTime.parse(startTime));
        newEvent.setEndTime(LocalDateTime.parse(endTime));
        return newEvent;
    }


}
