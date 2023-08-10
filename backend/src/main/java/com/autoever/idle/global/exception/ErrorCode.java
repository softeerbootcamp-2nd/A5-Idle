package com.autoever.idle.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    INVALID_CAR(400, "존재하지 않는 차종입니다"),
    INVALID_DETAIL_MODEL(400, "존재하지 않는 모델입니다");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
