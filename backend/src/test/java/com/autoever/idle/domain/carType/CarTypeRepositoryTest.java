package com.autoever.idle.domain.carType;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@DisplayName("CarType Repository Test")
class CarTypeRepositoryTest {

    SoftAssertions softAssertions;

    @Autowired
    CarTypeRepository carTypeRepository;

    @BeforeEach
    void beforeEach() {
        softAssertions = new SoftAssertions();
    }

    @Test
    @DisplayName("차종 이름으로 차종의 id를 찾는다")
    void findByName() {
        String carTypeName = "팰리세이드";

        List<Long> carTypeIds = carTypeRepository.findByName(carTypeName);

        softAssertions.assertThat(carTypeIds.size()).isEqualTo(1L);
    }

}
