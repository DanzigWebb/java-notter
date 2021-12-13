package com.example.notter.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name = "note_group")
@Data
public class GroupEntity extends BaseEntity {

    private String title;
    private String description;

    @ManyToOne
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    private DashboardEntity dashboard;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @ToString.Exclude
    private List<NoteEntity> notes;
}
