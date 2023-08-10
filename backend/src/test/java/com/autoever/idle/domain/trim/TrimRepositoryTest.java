package com.autoever.idle.domain.trim;

import com.autoever.idle.domain.trim.dto.TrimDto;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@DisplayName("Trim Repository Test")
class TrimRepositoryTest {

    SoftAssertions softAssertions;

    @Autowired
    TrimRepository trimRepository;

    @BeforeEach
    void beforeEach() {
        softAssertions = new SoftAssertions();
    }

    @Test
    @DisplayName("해당 차종의 트림을 반환한다")
    void findAll() {
        Long carTypeId = 1L;

        List<TrimDto> trims = trimRepository.findAll(carTypeId);

        softAssertions.assertThat(trims.size()).isEqualTo(4);
    }
}
