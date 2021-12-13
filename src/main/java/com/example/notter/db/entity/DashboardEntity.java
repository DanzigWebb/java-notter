package com.example.notter.db.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "dashboard")
@Data
public class DashboardEntity extends BaseEntity {
    private String name;
    private String description;

    @ManyToOne
    private UserEntity user;

    @OneToMany(mappedBy = "dashboard", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @ToString.Exclude
    private List<GroupEntity> groups;
}
