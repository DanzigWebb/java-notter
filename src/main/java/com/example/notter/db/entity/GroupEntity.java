package com.example.notter.db.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "note_group")
@Data
public class GroupEntity extends BaseEntity {

    private String title;
    private String description;

    @ManyToOne
    private UserEntity user;

    @OneToMany(mappedBy = "group")
    @ToString.Exclude
    private List<NoteEntity> notes;
}
