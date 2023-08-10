package com.autoever.idle.domain.detailModel.drivingMethod;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DrivingMethodResDto {
    private Long id;
    private String type;
    private int price;
    private String description;
    private String imgUrl;
    private String purchaseRate;

    public DrivingMethodResDto(Long id, String type, int price, String description, String imgUrl, String purchaseRate) {
        this.id = id;
        this.type = type;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.purchaseRate = purchaseRate;
    }
}
