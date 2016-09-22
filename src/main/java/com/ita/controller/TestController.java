package com.ita.controller;

import com.ita.repository.EventJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TestController {

    @Autowired
    EventJpaRepository repository;


        @RequestMapping("/greeting")
        public String greeting(@RequestParam(value="name", defaultValue="World") String name) {


            return "Hello World!";
        }

}