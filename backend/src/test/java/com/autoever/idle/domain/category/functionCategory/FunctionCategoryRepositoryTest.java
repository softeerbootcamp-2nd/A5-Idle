package com.autoever.idle.domain.category.functionCategory;

import com.autoever.idle.domain.category.functionCategory.dto.FunctionCategoryDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@DisplayName("Function Category Repository Test")
class FunctionCategoryRepositoryTest {

    @Autowired
    FunctionCategoryRepository functionCategoryRepository;

    @Test
    @DisplayName("전체 옵션 카테고리(8개)를 반환한다")
    void findAll() {
        List<FunctionCategoryDto> categories = functionCategoryRepository.findAll();

        assertThat(categories.size()).isEqualTo(8);
    }
}
