package com.ita.utils.validators;

import com.ita.constants.ErrorConstants;
import com.ita.entity.User;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by sdub on 14.10.2016.
 */
public class UserValidator   implements Validator {


    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {

        User user = (User)o;

        if(user.getFullName().isEmpty()) {
            errors.rejectValue("fullName", ErrorConstants.FULLNAME_CANT_BE_EMPTY);
        }

        if(user.getEmail().isEmpty()) {
            errors.rejectValue("email", ErrorConstants.EMAIL_IS_NOT_VALID);;
        }
    }
}
