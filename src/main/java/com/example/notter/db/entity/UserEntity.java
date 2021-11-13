package com.example.notter.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "user")
@Data
public class UserEntity extends BaseEntity {

    private String name;
    private String email;
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne()
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<NoteEntity> notes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<TagEntity> tags = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    private List<GroupEntity> groups = new ArrayList<>();
}
