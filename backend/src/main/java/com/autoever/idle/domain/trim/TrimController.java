package com.autoever.idle.domain.trim;

import com.autoever.idle.domain.trim.dto.TrimSelectionResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/trims")
public class TrimController {

    private final TrimService trimService;

    @GetMapping
    public ResponseEntity<List<TrimSelectionResDto>> getAllTrims(@RequestParam String carTypeName) throws Exception {
        List<TrimSelectionResDto> response = trimService.findAllTrims(carTypeName);
        return ResponseEntity.ok(response);
    }
}
