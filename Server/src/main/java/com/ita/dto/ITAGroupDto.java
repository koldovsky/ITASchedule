package com.ita.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.constants.ErrorConstants;
import com.ita.entity.ITAGroup;
import com.ita.repository.UserRepository;
import com.ita.utils.serializers.LocalDateDeserializer;
import com.ita.utils.serializers.LocalDateSerializer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

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
    @NotBlank(message = ErrorConstants.ITAGROUP_VALIDATION_TITLE_MISSING)
    private String title;

    @NotNull
    @Min(message = ErrorConstants.ITAGROUP_VALIDATION_STUDENTS_COUNT_WRONG, value = 1)
    @Max(message = ErrorConstants.ITAGROUP_VALIDATION_STUDENTS_COUNT_WRONG, value = 100)
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
    @NotNull
    @Min(value=0)
    private Long creatorId;

    @NotEmpty(message = ErrorConstants.ITAGROUP_VALIDATION_NO_USERS_SPECIFIED)
    private List<Long> userIds;


    public ITAGroupDto(){

    }

    public ITAGroupDto(Long id, String title, int studentsCount, LocalDate startDate,
                       LocalDate endDate, Boolean active,
                       Long creatorId, List<Long> userIds) {
        this.id=id;
        this.title=title;
        this.studentsCount=studentsCount;
        this.startDate=startDate;
        this.endDate=endDate;
        this.active =active;
        this.creatorId = creatorId;
        this.userIds = userIds;
    }

    public ITAGroup buildITAGroup(UserRepository userRepository){
        ITAGroup group = new ITAGroup();
        group.setId(id);
        group.setTitle(title);
        group.setStudentsCount(studentsCount);
        group.setStartDate(startDate);
        group.setEndDate(endDate);
        group.setActive(active);
        group.setCreator(userRepository.findOne(creatorId));
        group.setUsers(userRepository.findByIdIn(userIds));
        return group;
    }


}