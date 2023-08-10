package com.autoever.idle.global.exception.custom;

import com.autoever.idle.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidDetailModelException extends IllegalArgumentException {
    private final ErrorCode errorCode;

    public InvalidDetailModelException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
