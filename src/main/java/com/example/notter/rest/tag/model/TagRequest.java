package com.example.notter.rest.tag.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
public class TagRequest {

    @NotBlank(message = "Обязательное поле")
    String name;

    @Min(0)
    Integer color;
}
