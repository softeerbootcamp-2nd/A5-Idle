package com.autoever.idle.domain.detailModel;

import com.autoever.idle.domain.detailModel.dto.DetailModelResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trims/models")
public class DetailModelController {

    private final DetailModelService detailModelService;

    public DetailModelController(DetailModelService detailModelService) {
        this.detailModelService = detailModelService;
    }

    @GetMapping
    public ResponseEntity<DetailModelResDto> getAllDetailModels(@RequestParam Long trimId) {
        return ResponseEntity.ok(detailModelService.findAllModels(trimId));
    }

}
