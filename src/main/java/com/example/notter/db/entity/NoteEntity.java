package com.example.notter.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "note")
@Data
public class NoteEntity extends BaseEntity {

    private String title;

    private Boolean checked;

    private Long orderIndex;

    @Lob
    private String description;

    @ManyToOne
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    private GroupEntity group;

    @OneToMany(mappedBy = "note", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @ToString.Exclude
    private List<TodoEntity> todos = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.DETACH)
    @ToString.Exclude
    private List<TagEntity> tags;
}
