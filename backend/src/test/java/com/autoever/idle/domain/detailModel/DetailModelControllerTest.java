package com.autoever.idle.domain.detailModel;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("DetailModel Controller Test")
class DetailModelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("세부 모델 조회")
    void showDetailModel() throws Exception {
        //given
        Long trimId = 1L;

        //when
        ResultActions resultActions =
                mockMvc.perform(get("/trims/models")
                        .queryParam("trimId", trimId.toString()))
                .andDo(print());

        //then
        resultActions.andExpectAll(
                status().isOk(),
                content().contentType(MediaType.APPLICATION_JSON)
        );

    }
}