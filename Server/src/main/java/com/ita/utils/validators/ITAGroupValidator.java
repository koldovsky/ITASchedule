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

        ITAGroup group = (ITAGroup)obj;

        if(group.getEndDate().isBefore(group.getStartDate())){
            errors.rejectValue("endDate", ErrorConstants.ENDDATE_IS_BEFORE_STARTDATE);
        }
        if(group.getCreator() == null){
            errors.rejectValue("creatorFullName", ErrorConstants.NO_CREATOR_SPECIFIED);
        }
        if(group.getUsers().isEmpty()){
            System.out.println("-----"+group.getUsers().size());
            errors.rejectValue("usersFullNames", ErrorConstants.NO_USERS_SPECIFIED);
        }




    }
}
