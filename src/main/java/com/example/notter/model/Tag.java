package com.example.notter.model;

import com.example.notter.db.entity.TagEntity;

import java.time.LocalDateTime;

public class Tag {

    Integer id;
    String name;
    String color;
    LocalDateTime createAt;
    LocalDateTime updateAt;

    public static Tag toModel(TagEntity entity) {
        Tag t = new Tag();
        t.setId(entity.getId());
        t.setName(entity.getName());
        t.setColor(entity.getColor());
        t.setCreateAt(entity.getCreatedAt());
        t.setUpdateAt(entity.getUpdatedAt());

        return t;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

}
