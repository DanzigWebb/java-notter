package com.example.notter.rest.tag.model;

import com.example.notter.db.entity.TagEntity;
import lombok.Data;

@Data
public class Tag {

    Integer id;
    String name;
    String color;

    public static Tag toModel(TagEntity entity) {
        Tag t = new Tag();
        t.setId(entity.getId());
        t.setName(entity.getName());
        t.setColor(entity.getColor());

        return t;
    }
}
