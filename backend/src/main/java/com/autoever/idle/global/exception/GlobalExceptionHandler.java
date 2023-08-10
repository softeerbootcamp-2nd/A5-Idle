package com.autoever.idle.global.exception;

import com.autoever.idle.global.exception.custom.InvalidCarException;
import com.autoever.idle.global.exception.custom.InvalidDetailModelException;
import com.autoever.idle.global.exception.dto.ErrorDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ InvalidCarException.class })
    protected ResponseEntity<ErrorDto> handleInvalidCarException(InvalidCarException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorDto(e.getErrorCode().getStatus(), e.getErrorCode().getMessage()));
    }

    @ExceptionHandler({ InvalidDetailModelException.class })
    protected ResponseEntity<ErrorDto> handleInvalidDetailModelException(InvalidDetailModelException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorDto(e.getErrorCode().getStatus(), e.getErrorCode().getMessage()));
    }
}
