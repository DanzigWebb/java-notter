package com.example.notter.rest.dashboard.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class DashboardUpdateRequest {
    @NotBlank(message = "Обязательное поле")
    String name;
    String description;

    Integer groupId;
}
