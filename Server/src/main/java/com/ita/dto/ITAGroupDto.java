package com.ita.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdArraySerializers;
import com.ita.constants.ErrorConstants;
import com.ita.entity.ITAGroup;
import com.ita.entity.User;
import com.ita.repository.UserRepository;
import com.ita.utils.serializers.LocalDateDeserializer;
import com.ita.utils.serializers.LocalDateSerializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class ITAGroupDto {

    private Long id;
    @NotBlank(message = "Title is missing")
    private String title;

    @NotNull
    @Min(message = "Minimal numer of students is 1", value = 1)
    @Max(message = "Maximal numer of students is 100", value = 100)
    private int studentsCount;

    @NotNull
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate startDate;

    @NotNull
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate endDate;

    private Boolean isActive;

    private String creatorFullName;

    private List<String> usersFullNames;


    public ITAGroupDto(){

    }

    public ITAGroupDto(Long id, String title, int studentsCount, LocalDate startDate,
                       LocalDate endDate, Boolean isActive,
                    String creatorFullName, List<String> usersFullNames) {
        this.id=id;
        this.title=title;
        this.studentsCount=studentsCount;
        this.startDate=startDate;
        this.endDate=endDate;
        this.isActive =isActive;
        this.creatorFullName = creatorFullName;
        this.usersFullNames = usersFullNames;
    }

    public ITAGroup buildITAGroup(UserRepository userRepository){
        ITAGroup group = new ITAGroup();
        group.setId(id);
        group.setTitle(title);
        group.setStudentsCount(studentsCount);
        group.setStartDate(startDate);
        group.setEndDate(endDate);
        group.setActive(isActive);
        group.setCreator(userRepository.findByFullName(creatorFullName));
        group.setUsers(userRepository.findByFullNameIn(usersFullNames));
        return group;
    }


}