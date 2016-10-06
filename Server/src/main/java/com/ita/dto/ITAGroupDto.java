package com.ita.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.List;

@Getter
@Setter
@ToString
public class ITAGroupDto {

    private String title;

    private Integer studentsCount;

    private String startDate;

    private String endDate;

    private Boolean isActive;

    private String creatorFullName;

    private List<String> usersFullNames;

    public ITAGroupDto(){

    }

    public ITAGroupDto(String title, Integer studentsCount, String startDate,
                    String endDate, Boolean isActive,
                    String creatorFullName, List<String> usersFullNames) {
        this.title=title;
        this.studentsCount=studentsCount;
        this.startDate=startDate;
        this.endDate=endDate;
        this.isActive =isActive;
        this.creatorFullName = creatorFullName;
        this.usersFullNames = usersFullNames;
    }


}