package com.ita.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by marian on 07.10.16.
 */
@Getter
@Setter
public class FieldErrorDTO {
    private String field;
    private String message;

    public FieldErrorDTO(String field, String message){
        this.field = field;
        this.message = message;
    }
}
