package com.example.notter.db.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity(name = "note_todo")
@Data
public class NoteTodoEntity extends BaseEntity {
    private String title;
    private Boolean checked;

    @ManyToOne
    private NoteEntity note;
}
