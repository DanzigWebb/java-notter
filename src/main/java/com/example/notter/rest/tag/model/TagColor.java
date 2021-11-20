package com.example.notter.rest.tag.model;

import com.example.notter.db.entity.TagColorEntity;
import lombok.Data;

@Data
public class TagColor {
    Integer id;
    String type;

    public static TagColor toModel(TagColorEntity entity) {
        var t = new TagColor();
        t.setId(entity.getId());
        t.setType(entity.getType());

        return t;
    }
}
