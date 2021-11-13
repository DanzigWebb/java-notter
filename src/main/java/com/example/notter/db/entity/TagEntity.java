package com.example.notter.db.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity(name = "tag")
@Data
public class TagEntity extends BaseEntity {

    @NotBlank(message = "Обязательное поле")
    private String name;

    @Length(min = 2, message = "Минимальная длина 6 символов")
    private String color;

    @ManyToOne
    private UserEntity user;
}
