package com.example.notter.db.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity(name = "diary")
@Data
public class DiaryEntity extends BaseEntity {
    private Date day;

    @Lob
    private String situation;

    @Lob
    private String think;

    @Lob
    private String emotions;

    @Lob
    private String reaction;

    @Lob
    private String bodySensation;

    @ManyToOne
    private UserEntity user;
}
