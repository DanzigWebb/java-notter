package com.example.notter.rest.note.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TodoRequest {

    @NotBlank(message = "Обязательное поле")
    String title;

    Boolean checked;
}
