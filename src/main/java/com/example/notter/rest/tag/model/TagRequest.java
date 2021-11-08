package com.example.notter.rest.tag.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class TagRequest {

    @NotBlank(message = "Обязательное поле")
    String name;

    @Length(min = 2, message = "Минимум символов: 2")
    String color;
}
