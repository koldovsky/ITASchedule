package com.ita.utils.exceptions;

import com.ita.constants.ErrorConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by marian on 06.10.16.
 */
@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY, reason=ErrorConstants.BAD_ITAGROUP_OBJECT)
public class BrokenITAGroupObjectException extends RuntimeException {
    private String reason = ErrorConstants.BAD_ITAGROUP_OBJECT;

    public BrokenITAGroupObjectException(){}

    public BrokenITAGroupObjectException(String reason) { this.reason = reason; }

    public String getReason() {return reason;}

    public void setReason(String reason) { this.reason = reason; }
}
