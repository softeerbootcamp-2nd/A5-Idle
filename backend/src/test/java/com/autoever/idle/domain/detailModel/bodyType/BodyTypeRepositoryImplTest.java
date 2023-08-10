package com.autoever.idle.domain.detailModel.bodyType;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@SpringBootTest
@DisplayName("BodyType Repository Test")
class BodyTypeRepositoryImplTest {

    @Autowired
    private BodyTypeRepository bodyTypeRepository;

    @Test
    @DisplayName("트림 id를 통해 연관된 바디 타입 조회")
    void findBodyType() {
        //given
        Long trimId = 1L;

        //when
        List<BodyTypeResDto> bodyTypeResDtos = bodyTypeRepository.findAll(trimId);

        //then
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(bodyTypeResDtos.size()).isEqualTo(2);
            softAssertions.assertThat(bodyTypeResDtos.get(0).getType()).isEqualTo("7인승");
            softAssertions.assertThat(bodyTypeResDtos.get(1).getType()).isEqualTo("8인승");
                }
        );
    }
}