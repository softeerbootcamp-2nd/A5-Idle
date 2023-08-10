package com.autoever.idle.domain.detailModel.drivingMethod;

import java.util.List;

public interface DrivingMethodRepository {
    List<DrivingMethodResDto> findAll(Long trimId);
}
