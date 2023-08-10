package com.autoever.idle.domain.detailModel.dto;

import com.autoever.idle.domain.detailModel.bodyType.BodyTypeResDto;
import com.autoever.idle.domain.detailModel.drivingMethod.DrivingMethodResDto;
import com.autoever.idle.domain.detailModel.engine.EngineResDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class DetailModelResDto {

    private List<EngineResDto> engines;
    private List<DrivingMethodResDto> drivingMethods;
    private List<BodyTypeResDto> bodyTypes;

    public static DetailModelResDto create(List<EngineResDto> engines,
                                           List<DrivingMethodResDto> drivingMethods,
                                           List<BodyTypeResDto> bodyTypes) {
        return DetailModelResDto.builder()
                .engines(engines)
                .drivingMethods(drivingMethods)
                .bodyTypes(bodyTypes)
                .build();
    }
}
