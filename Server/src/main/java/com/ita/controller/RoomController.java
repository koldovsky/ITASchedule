package com.ita.controller;

import com.ita.dto.RoomDto;
import com.ita.entity.Room;
import com.ita.repository.AddressJpaRepository;
import com.ita.repository.CityRepository;
import com.ita.repository.RoomRepository;
import com.ita.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    AddressJpaRepository addressJpaRepository;

    @Autowired
    CityRepository cityRepository;

    @Autowired
    private RoomService roomService;

    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    @RequestMapping(value = "/createRoom",
            method = {RequestMethod.POST},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createRoom(@RequestBody @Valid RoomDto roomDto){
        Room room = roomService.buildRoom(roomDto);

        roomRepository.save(room);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
