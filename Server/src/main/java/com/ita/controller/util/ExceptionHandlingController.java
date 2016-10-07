package com.ita.controller.util;

import com.ita.constants.ErrorConstants;
import com.ita.dto.FieldErrorDTO;
import com.ita.dto.ValidationErrorDTO;
import com.ita.utils.exceptions.ITAGroupValidationException;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by marian on 06.10.16.
 */
@ControllerAdvice
public class ExceptionHandlingController {

    @Autowired
    MessageSource messageSource;

    //@ExceptionHandler(ITAGroupValidationException.class)
    //@ResponseBody
    public ResponseEntity<FieldErrorDTO> ITAGroupObjectValidationFailed(ITAGroupValidationException e){
        BindingResult result = e.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        ValidationErrorDTO errorsDto = new ValidationErrorDTO();
        errorsDto.setMessage(e.getReason());
        for(FieldError error : fieldErrors){
            String message = messageSource.getMessage(error,null);
            errorsDto.addFieldError(error.getCode(), message);
            System.out.println("============"+error.getField()+"====="+message);
        }

        FieldErrorDTO dto = new FieldErrorDTO("AAAAA","BBBB");
        System.out.println(dto.getField()+" ======== "+dto.getMessage());
        return new ResponseEntity<FieldErrorDTO>(dto, HttpStatus.BAD_REQUEST);

    }

}
