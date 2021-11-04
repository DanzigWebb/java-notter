package com.example.notter.model;

import com.example.notter.db.entity.NoteEntity;

public class Note {

    Integer id;
    String title;
    String description;

    public static Note toModel(NoteEntity entity) {
        Note n = new Note();
        n.setId(entity.getId());
        n.setTitle(entity.getTitle());
        n.setDescription(entity.getDescription());

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

}
