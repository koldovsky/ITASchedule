package com.ita.service;

import com.ita.dto.RoomDto;
import com.ita.entity.Room;
import com.ita.repository.AddressJpaRepository;
import com.ita.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {


    @Autowired
    private AddressJpaRepository addressJpaRepository;


    public Room buildRoom(RoomDto roomDto){
        Room room = Room.newBuilderRoom().setId(roomDto.getId())
                .setNumber(roomDto.getNumber())
                .setActive(roomDto.getActive())
                .setAddress(addressJpaRepository.findByAddress(roomDto.getAddress()))
                .build();
        return room;
    }
}

