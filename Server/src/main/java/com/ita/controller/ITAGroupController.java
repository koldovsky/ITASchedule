package com.ita.controller;


import com.ita.service.*;
import com.ita.entity.ITAGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ita.dto.ITAGroupDto;

@RestController
public class ITAGroupController{

    @Autowired
    private ITAGroupService itaGroupService;

    @RequestMapping(value="/createGroup",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ITAGroup> createGroup(@RequestBody ITAGroupDto groupDto){
        itaGroupService.createGroup(groupDto);
        return new ResponseEntity<ITAGroup>(HttpStatus.CREATED);
    }

}