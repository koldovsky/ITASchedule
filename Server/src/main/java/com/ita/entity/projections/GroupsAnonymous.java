package com.ita.entity.projections;


import com.ita.entity.ITAGroup;
import com.ita.entity.User;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "groupAnonymous", types = {ITAGroup.class})

public interface GroupsAnonymous {

    String getTitle();

    Boolean getActive();
}
