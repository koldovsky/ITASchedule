package com.ita.entity.projections;

import com.ita.entity.ITAGroup;
//import com.ita.entity.projections.UserFullName;
import com.ita.utils.serializers.LocalDateDeserializer;
import com.ita.utils.serializers.LocalDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.beans.factory.annotation.Value;
import com.ita.entity.User;
import java.time.LocalDate;
import java.util.List;


@Projection(name="groupItem", types = {ITAGroup.class})
public interface GroupDetail{

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.studentsCount}")
    Integer getStudentsCount();

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    LocalDate getStartDate();

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    LocalDate getEndDate();

    //@Value("#{target.isActive}")
    boolean getIsActive();

    User getCreator();

    List<UserFullName> getUsers();


}
