package com.ita.utils.validators;

import com.ita.constants.ErrorConstants;
import com.ita.entity.ITAGroup;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
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
        ValidationUtils.rejectIfEmpty(errors, "title", "field.required");
        ITAGroup group = (ITAGroup)obj;
        if(group.getStudentsCount()< ErrorConstants.MIN_ITAGROUP_STUDENTS_COUNT &&
                group.getStudentsCount()>ErrorConstants.MAX_ITAGROUP_STUDENTS_COUNT){
            errors.rejectValue("studentsCount", ErrorConstants.STUDENTS_COUNT_OUT_OF_RANGE);
        }
        if(group.getStartDate().isBefore(LocalDate.now())){
            errors.rejectValue("startDate", ErrorConstants.STARTDATE_IS_BEFORE_CURRENTDATE);
        }
        if(group.getEndDate().isBefore(group.getStartDate())){
            errors.rejectValue("endDate", ErrorConstants.ENDDATE_IS_BEFORE_STARTDATE);
        }
        /**
         * List of teachers and creator are not validated here
         * since they are built in the service method that will
         * throw exception to the client of they are not found
         * in the database.
         */



    }
}
