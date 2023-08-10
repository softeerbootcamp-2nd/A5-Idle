package com.autoever.idle.domain.trim;

import com.autoever.idle.global.exception.custom.InvalidCarException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("Trim Service Test")
class TrimServiceTest {

    @Autowired
    TrimService trimService;

    @Test
    @DisplayName("유효하지 않은 차종으로 조회하면 InvalidCarException이 발생한다")
    void findAllTrimsInvalidCarType() {
        String carTypeName = "팰리세";

        assertThrows(InvalidCarException.class,
                () -> trimService.findAllTrims(carTypeName));
    }
}
