package com.autoever.idle.domain.detailModel;

import com.autoever.idle.domain.detailModel.bodyType.BodyTypeRepository;
import com.autoever.idle.domain.detailModel.drivingMethod.DrivingMethodRepository;
import com.autoever.idle.domain.detailModel.dto.DetailModelResDto;
import com.autoever.idle.domain.detailModel.engine.EngineRepository;
import com.autoever.idle.global.exception.ErrorCode;
import com.autoever.idle.global.exception.custom.InvalidDetailModelException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

import static com.autoever.idle.global.exception.ErrorCode.INVALID_DETAIL_MODEL;

@Service
public class DetailModelService {

    private final EngineRepository engineRepository;
    private final DrivingMethodRepository drivingMethodRepository;
    private final BodyTypeRepository bodyTypeRepository;

    public DetailModelService(EngineRepository engineRepository,
                              DrivingMethodRepository drivingMethodRepository,
                              BodyTypeRepository bodyTypeRepository) {
        this.engineRepository = engineRepository;
        this.drivingMethodRepository = drivingMethodRepository;
        this.bodyTypeRepository = bodyTypeRepository;
    }

    public DetailModelResDto findAllModels(Long trimId) {
        DetailModelResDto detailModelResDto = DetailModelResDto.create(engineRepository.findAll(trimId),
                drivingMethodRepository.findAll(trimId),
                bodyTypeRepository.findAll(trimId));

        validateDetailModels(detailModelResDto);
        return detailModelResDto;
    }

    private void validateDetailModels(DetailModelResDto detailModelResDto) {
        if (Stream.of(detailModelResDto.getEngines(), detailModelResDto.getDrivingMethods(), detailModelResDto.getBodyTypes())
                .anyMatch(List::isEmpty)) {
            throw new InvalidDetailModelException(INVALID_DETAIL_MODEL);
        }
    }
}
