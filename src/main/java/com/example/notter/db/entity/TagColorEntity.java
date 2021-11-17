package com.example.notter.db.entity;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "tag_color")
@Data
public class TagColorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String type;
}
