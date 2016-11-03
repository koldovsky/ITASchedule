package com.ita.utils.validators;

import com.ita.constants.ErrorConstants;
import com.ita.entity.ITAGroup;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDate;

/**
 * Created by marian on 07.10.16.
 */
@Component
public class ITAGroupValidator implements Validator {


    @Override
    public boolean supports(Class<?> aClass) {
        return ITAGroup.class.equals(aClass);
    }

    @Override
    public void validate(Object obj, Errors errors) {

        ITAGroup group = (ITAGroup)obj;

        if(group.getStartDate().isBefore(LocalDate.now().minusDays(1))){
            errors.reject("startDate", ErrorConstants.ITAGROUP_VALIDATION_STARTDATE_IS_BEFORE_CURRENTDATE);
        }
        if(group.getEndDate().isBefore(group.getStartDate())){
            errors.reject("endDate", ErrorConstants.ITAGROUP_VALIDATION_ENDDATE_IS_BEFORE_STARTDATE);
        }
    }
}
