package com.ita.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.entity.ITAGroup;
import com.ita.repository.UserRepository;
import com.ita.utils.serializers.LocalDateDeserializer;
import com.ita.utils.serializers.LocalDateSerializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
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

    private Boolean active;

    private String creatorFullName;

    private List<String> usersFullNames;


    public ITAGroupDto(){

    }

    public ITAGroupDto(Long id, String title, int studentsCount, LocalDate startDate,
                       LocalDate endDate, Boolean active,
                    String creatorFullName, List<String> usersFullNames) {
        this.id=id;
        this.title=title;
        this.studentsCount=studentsCount;
        this.startDate=startDate;
        this.endDate=endDate;
        this.active =active;
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
        group.setActive(active);
        group.setCreator(userRepository.findByFullName(creatorFullName));
        group.setUsers(userRepository.findByFullNameIn(usersFullNames));
        return group;
    }


}