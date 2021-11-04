package com.example.notter.model;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.util.Util;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class Group {

    Integer id;
    String title;
    String description;
    LocalDateTime createAt;
    LocalDateTime updateAt;
    List<Note> notes;

    public static Group toModel(GroupEntity entity) {
        Group g = new Group();
        g.setId(entity.getId());
        g.setTitle(entity.getTitle());
        g.setDescription(entity.getDescription());
        g.setCreateAt(entity.getCreatedAt());
        g.setUpdateAt(entity.getUpdatedAt());
        g.setNotes(Util.IterableToList(entity.getNotes())
                .stream().map(Note::toModel)
                .collect(Collectors.toList())
        );

        return g;
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

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
