package com.example.notter.model;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.util.Util;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class Note {

    Integer id;
    String title;
    String description;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    List<Tag> tags;


    public static Note toModel(NoteEntity entity) {
        Note n = new Note();
        n.setId(entity.getId());
        n.setTitle(entity.getTitle());
        n.setDescription(entity.getDescription());
        n.setCreateAt(entity.getCreatedAt());
        n.setUpdateAt(entity.getUpdatedAt());

        n.setTags(Util.IterableToList(entity.getTags())
                .stream().map(Tag::toModel)
                .collect(Collectors.toList())
        );

        return n;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
}
