package com.example.notter.db.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    @OneToMany(mappedBy = "user")
    private List<NoteEntity> notes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<TagEntity> tags = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<GroupEntity> groups = new ArrayList<>();

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<TagEntity> getTags() {
        return tags;
    }

    public List<NoteEntity> getNotes() {
        return notes;
    }

    public List<GroupEntity> getGroups() {
        return groups;
    }
}
