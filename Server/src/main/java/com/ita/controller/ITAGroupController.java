package com.ita.controller;


import com.google.gson.Gson;
import com.ita.entity.ITAGroup;
import com.ita.repository.ITAGroupRepository;
import com.ita.repository.UserRepository;
import com.ita.utils.validators.ITAGroupValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import com.ita.dto.ITAGroupDto;

import javax.validation.Valid;

@RestController
public class ITAGroupController{


    @Autowired
    private UserRepository userRepository;

    @Autowired
    ITAGroupRepository itaGroupRepository;

    @Autowired
    private ITAGroupValidator itaGroupValidator;


    @RequestMapping(value="/writeGroup",
            method = {RequestMethod.PUT, RequestMethod.POST},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateGroup(@RequestBody @Valid ITAGroupDto groupDto, BindingResult bindingResult){
        ITAGroup group = groupDto.buildITAGroup(userRepository);
        itaGroupValidator.validate(group,bindingResult);
        if(bindingResult.hasErrors()){
            String jsonValidationMessage = new Gson().toJson(bindingResult.getFieldErrors());
            return ResponseEntity.badRequest().body(jsonValidationMessage);
        }
        itaGroupRepository.save(group);
        return ResponseEntity.ok().build();
    }

}