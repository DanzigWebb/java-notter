package com.example.notter.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name = "role")
@Data
public class RoleEntity extends BaseEntity {

    @Column
    private String name;
}

