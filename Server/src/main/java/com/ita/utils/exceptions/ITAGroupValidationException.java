package com.ita.utils.exceptions;

import com.ita.constants.ErrorConstants;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by marian on 07.10.16.
 */
@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason=ErrorConstants.ITAGROUP_NOT_VALID)
public class ITAGroupValidationException extends RuntimeException{

    private String reason = ErrorConstants.ITAGROUP_NOT_VALID;

    private BindingResult result = null;

    public ITAGroupValidationException(BindingResult result){
        this.result = result;
    }

    public ITAGroupValidationException(String reason) { this.reason = reason; }

    public String getReason() {return reason;}

    public void setReason(String reason) { this.reason = reason; }

    public BindingResult getBindingResult(){ return result;}
}
