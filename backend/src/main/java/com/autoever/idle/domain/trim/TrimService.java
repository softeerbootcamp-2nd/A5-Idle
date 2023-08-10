package com.autoever.idle.domain.trim;

import com.autoever.idle.domain.carType.CarTypeRepository;
import com.autoever.idle.domain.carType.CarTypeRepositoryImpl;
import com.autoever.idle.domain.category.functionCategory.FunctionCategoryRepository;
import com.autoever.idle.domain.category.functionCategory.FunctionCategoryRepositoryImpl;
import com.autoever.idle.domain.category.functionCategory.dto.DefaultFunctionCategoryResDto;
import com.autoever.idle.domain.category.functionCategory.dto.FunctionCategoryDto;
import com.autoever.idle.domain.function.dto.DefaultFunctionResDto;
import com.autoever.idle.domain.trim.dto.TrimDto;
import com.autoever.idle.domain.trim.dto.TrimSelectionResDto;
import com.autoever.idle.global.exception.custom.InvalidCarException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.autoever.idle.global.exception.ErrorCode.INVALID_CAR;

@Service
public class TrimService {

    private final CarTypeRepository carTypeRepository;
    private final TrimRepository trimRepository;
    private final FunctionCategoryRepository functionCategoryRepository;

    public TrimService(CarTypeRepositoryImpl carTypeRepository, TrimRepositoryImpl trimRepository, FunctionCategoryRepositoryImpl functionCategoryRepository) {
        this.carTypeRepository = carTypeRepository;
        this.trimRepository = trimRepository;
        this.functionCategoryRepository = functionCategoryRepository;
    }

    public List<TrimSelectionResDto> findAllTrims(String carTypeName) {
        List<Long> carTypeIds = carTypeRepository.findByName(carTypeName);
        System.out.println(carTypeIds);
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
