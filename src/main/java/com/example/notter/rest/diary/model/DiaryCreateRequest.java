package com.example.notter.rest.diary.model;

import lombok.Data;

import java.util.Date;

@Data
public class DiaryCreateRequest {
    Date day;
    String situation;
    String think;
    String emotions;
    String reaction;
    String bodySensation;
}
