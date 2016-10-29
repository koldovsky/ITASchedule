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
    private List<String> userEmails;
    @NotNull
    private String creatorEmail;

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





}
