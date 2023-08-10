package com.autoever.idle.domain.detailModel.bodyType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BodyTypeResDto {
    private String type;
    private int price;
    private String description;
    private String purchaseRate;
    private String imgUrl;

    public BodyTypeResDto(String type, int price, String description, String purchaseRate, String imgUrl) {
        this.type = type;
        this.price = price;
        this.description = description;
        this.purchaseRate = purchaseRate;
        this.imgUrl = imgUrl;
    }
}
