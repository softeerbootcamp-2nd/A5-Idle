package com.autoever.idle.domain.detailModel;

import com.autoever.idle.domain.detailModel.dto.DetailModelResDto;
import com.autoever.idle.global.exception.custom.InvalidDetailModelException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("DetailModel Service Test")
class DetailModelServiceTest {

    @Autowired
    private DetailModelService detailModelService;

    @Test
    @DisplayName("검증한 세부모델 dto의 필드 중 어느 하나라도 비어있으면 예외 발생")
    void validateDetailModels_isEmpty() {
        //given
        Long trimId = 123123123123L;

        //when, then
        assertThrows(InvalidDetailModelException.class, () -> {
            detailModelService.findAllModels(trimId);
        });
    }

    @Test
    @DisplayName("정상적으로 세부모델 dto 반환")
    void findAllModels() {
        //given
        Long trimId = 1L;

        //when
        DetailModelResDto detailModelResDto = detailModelService.findAllModels(trimId);

        //then
        assertSoftly(softAssertions -> {
                    softAssertions.assertThat(detailModelResDto.getEngines().size()).isEqualTo(2);
                    softAssertions.assertThat(detailModelResDto.getDrivingMethods().size()).isEqualTo(2);
                    softAssertions.assertThat(detailModelResDto.getBodyTypes().size()).isEqualTo(2);
                }
        );
    }


}