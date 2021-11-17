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

    @ManyToOne(cascade = CascadeType.REFRESH)
    private TagColorEntity color;

    @ManyToOne
    private UserEntity user;
}
