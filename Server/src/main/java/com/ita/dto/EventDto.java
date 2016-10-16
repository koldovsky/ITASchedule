package com.ita.dto;

import com.ita.entity.*;
import com.ita.repository.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class EventDto {

    private Long id;
    @NotNull
    private String title;
    @NotNull
    private List<String> usersFullNames;
    @NotNull
    private String creatorFullName;

    private List<String> groupTitles;
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


    public Event buildEvent(UserRepository userRepository, EventTypeRepository eventTypeRepository, RoomRepository roomRepository, AddressJpaRepository addressJpaRepository, ITAGroupRepository itaGroupRepository) {
        Event event = new Event();
        event.setId(id);
        event.setTitle(title);
        event.setUsers(userRepository.findByFullNameIn(usersFullNames));
        event.setCreator(userRepository.findByFullName(creatorFullName));
        event.setITAGroups(itaGroupRepository.findByTitleIn(groupTitles));
        event.setType(eventTypeRepository.findByType(type));
        event.setRoom(roomRepository.findByAddressAndNumber(addressJpaRepository.findByCodeName(addressCodeName), roomNumber));
        event.setStartTime(LocalDateTime.parse(startTime));
        event.setEndTime(LocalDateTime.parse(endTime));
        return event;
    }


}
