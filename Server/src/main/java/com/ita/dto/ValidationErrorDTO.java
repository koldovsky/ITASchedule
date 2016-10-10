package com.ita.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by marian on 07.10.16.
 */
@Getter
@Setter
public class ValidationErrorDTO {
    private String message;
    private List<FieldErrorDTO> fieldErrors = new ArrayList<>();
    public ValidationErrorDTO(){}
    public void addFieldError(String field, String message){
        FieldErrorDTO error = new FieldErrorDTO(field,message);
        fieldErrors.add(error);
    }
}
