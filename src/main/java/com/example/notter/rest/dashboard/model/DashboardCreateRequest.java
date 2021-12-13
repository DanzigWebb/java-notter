package com.example.notter.rest.dashboard.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class DashboardCreateRequest {

    @NotBlank(message = "Обязательное поле")
    String name;
    String description;
}
