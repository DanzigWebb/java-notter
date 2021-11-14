package com.example.notter.rest.note.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class NoteRequest {

    @NotBlank(message = "Обязательное поле")
    String title;

    String description;

    Integer groupId;
}
