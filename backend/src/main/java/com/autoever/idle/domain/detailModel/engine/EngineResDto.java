package com.autoever.idle.domain.detailModel.engine;

import lombok.Getter;

@Getter
public class EngineResDto {

    private Long id;
    private String type;
    private int price;
    private String description;
    private String purchaseRate;
    private String imgUrl;
    private int peakOutput;
    private double enginemaxTorque;
    private double minFuel;
    private double maxFuel;

    public EngineResDto(Long id, String type, int price, String description, String purchaseRate,
                        String imgUrl, int peakOutput, double enginemaxTorque, double minFuel, double maxFuel) {
        this.id = id;
        this.type = type;
        this.price = price;
        this.description = description;
        this.purchaseRate = purchaseRate;
        this.imgUrl = imgUrl;
        this.peakOutput = peakOutput;
        this.enginemaxTorque = enginemaxTorque;
        this.minFuel = minFuel;
        this.maxFuel = maxFuel;
    }
}
