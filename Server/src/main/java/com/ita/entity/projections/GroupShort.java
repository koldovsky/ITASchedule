package com.ita.entity.projections;

import com.ita.entity.ITAGroup;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by sdub on 14.10.2016.
 */

@Projection(name="shortinfo", types = {ITAGroup.class})
public interface GroupShort{

    Long getId();

    String getTitle();

    boolean getActive();



}