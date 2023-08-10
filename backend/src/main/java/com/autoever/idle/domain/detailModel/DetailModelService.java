package com.autoever.idle.domain.detailModel;

import com.autoever.idle.domain.detailModel.bodyType.BodyTypeRepository;
import com.autoever.idle.domain.detailModel.drivingMethod.DrivingMethodRepository;
import com.autoever.idle.domain.detailModel.dto.DetailModelResDto;
import com.autoever.idle.domain.detailModel.engine.EngineRepository;
import org.springframework.stereotype.Service;

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
        return DetailModelResDto.create(engineRepository.findAll(trimId),
                drivingMethodRepository.findAll(trimId),
                bodyTypeRepository.findAll(trimId));
    }
}
