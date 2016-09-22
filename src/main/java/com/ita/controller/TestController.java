package com.ita.controller;

import com.ita.entity.Event;
import com.ita.repository.EventJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedList;
import java.util.List;


@RestController
public class TestController {

    @Autowired
    EventJpaRepository repository;


        @RequestMapping("/greeting")
        public String greeting(@RequestParam(value="name", defaultValue="World") String name) {

            List<Event> evArr = new LinkedList<>();
            LocalDateTime today = LocalDateTime.now();
            LocalDateTime tomorrow = today.plus(1, ChronoUnit.DAYS);
            Event ev1 = new Event("NewEvent1", null, null,null, null, today, tomorrow);
            Event ev2 = new Event("NewEvent2", null, null,null, null, today, tomorrow);
            evArr.add(ev1);
            evArr.add(ev2);

            repository.save(evArr);

            return "Hello World!";
        }

}