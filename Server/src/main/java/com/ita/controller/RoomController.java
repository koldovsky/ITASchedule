package com.ita.controller;

import com.ita.dto.RoomDto;
import com.ita.entity.Room;
import com.ita.repository.AddressJpaRepository;
import com.ita.repository.CityRepository;
import com.ita.repository.RoomRepository;
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
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    AddressJpaRepository addressJpaRepository;

    @Autowired
    CityRepository cityRepository;

   /* @Autowired
    RoomService roomService;*/

    @RequestMapping(value = "/createRoom",
            method = {RequestMethod.POST},
            consumes = MediaType.APPLICATION_JSON_VALUE)//try without it
    public ResponseEntity createRoom(@RequestBody @Valid RoomDto roomDto, BindingResult bindingResult){
        System.out.println(roomDto.getNumber());
        System.out.println(roomDto.getAddress());
        Room room = roomDto.buildRoom(addressJpaRepository);

        roomRepository.save(room);
//        return new ResponseEntity<>(HttpStatus.OK);
        return ResponseEntity.ok().build();
    }

}
