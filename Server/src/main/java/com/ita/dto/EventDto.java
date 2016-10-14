package com.ita.dto;

import com.ita.entity.EventType;
import com.ita.entity.ITAGroup;
import com.ita.entity.Room;
import com.ita.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventDto {


    private String title;
    private List<User> teacherList;
    private User creator;
    private List<ITAGroup> itaGroups;
    private String type;
    private String roomNumber;
    private String addressCodeName;
    private String startTime;
    private String endTime;



    public EventDto() {
    }
}
