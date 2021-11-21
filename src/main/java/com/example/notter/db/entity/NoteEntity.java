package com.example.notter.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "note")
@Data
public class NoteEntity extends BaseEntity {

    private String title;

    private String description;

    private Boolean checked;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private GroupEntity group;

    @OneToMany(mappedBy = "note", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @ToString.Exclude
    private List<TodoEntity> todos = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.DETACH)
    @ToString.Exclude
    private List<TagEntity> tags;
}
