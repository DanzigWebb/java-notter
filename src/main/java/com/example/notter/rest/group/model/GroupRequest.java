package com.example.notter.rest.group.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class GroupRequest {

    @NotBlank(message = "Обязательное поле")
    String title;

    Integer dashboardId;

    String description;
}
