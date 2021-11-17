package com.example.notter.rest.tag.model;

import com.example.notter.db.entity.TagEntity;
import lombok.Data;

@Data
public class Tag {

    Integer id;
    String name;
    TagColor color;

    public static Tag toModel(TagEntity entity) {
        Tag t = new Tag();
        t.setId(entity.getId());
        t.setName(entity.getName());
        t.setColor(TagColor.toModel(entity.getColor()));

        return t;
    }
}
