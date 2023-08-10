package com.autoever.idle.domain.trim;

import com.autoever.idle.domain.carType.CarTypeRepository;
import com.autoever.idle.domain.category.functionCategory.FunctionCategoryRepository;
import com.autoever.idle.domain.category.functionCategory.dto.DefaultFunctionCategoryResDto;
import com.autoever.idle.domain.category.functionCategory.dto.FunctionCategoryDto;
import com.autoever.idle.domain.function.dto.DefaultFunctionResDto;
import com.autoever.idle.domain.trim.dto.TrimDto;
import com.autoever.idle.domain.trim.dto.TrimSelectionResDto;
import com.autoever.idle.global.exception.custom.InvalidCarException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.autoever.idle.global.exception.ErrorCode.INVALID_CAR;

@Service
@RequiredArgsConstructor
public class TrimService {

    private final CarTypeRepository carTypeRepository;
    private final TrimRepository trimRepository;
    private final FunctionCategoryRepository functionCategoryRepository;

    public List<TrimSelectionResDto> findAllTrims(String carTypeName) {
        List<Long> carTypeIds = carTypeRepository.findByName(carTypeName);
        if (carTypeIds.isEmpty()) {
            throw new InvalidCarException(INVALID_CAR);
        }

        List<TrimDto> trims = trimRepository.findAll(carTypeIds.get(0));
        List<FunctionCategoryDto> categories = functionCategoryRepository.findAll();

        List<TrimSelectionResDto> trimDtos = new ArrayList<>();
        for (TrimDto trim : trims) {
            List<DefaultFunctionCategoryResDto> categoryDtos = new ArrayList<>();
            for (FunctionCategoryDto category : categories) {
                List<DefaultFunctionResDto> defaultFunctionDtos =
                        functionCategoryRepository.getDefaultOptions(trim.getTrimId(), category.getFunctionCategoryId());
                DefaultFunctionCategoryResDto defaultCategoryDto = DefaultFunctionCategoryResDto.createDefaultFunctionDto(category, defaultFunctionDtos);
                categoryDtos.add(defaultCategoryDto);
            }
            TrimSelectionResDto trimDto = TrimSelectionResDto.createDto(trim, categoryDtos);
            trimDtos.add(trimDto);
        }

        return trimDtos;
    }
}
