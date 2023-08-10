package com.autoever.idle.domain.detailModel.engine;

import java.util.List;

public interface EngineRepository {
    List<EngineResDto> findAll();
}
