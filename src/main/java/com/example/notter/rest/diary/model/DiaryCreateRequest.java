package com.example.notter.rest.diary.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class DiaryCreateRequest {
    @NotBlank(message = "Обязательное поле")
    Date day;

    String situation;
    String think;
    String emotions;
    String reaction;
    String bodySensation;
}
