package com.example.notter.rest.diary.model;

import com.example.notter.db.entity.DiaryEntity;
import lombok.Data;

import java.util.Date;

@Data
public class Diary {
    Integer id;
    Date day;
    String situation;
    String think;
    String emotions;
    String reaction;
    String bodySensation;

    public static Diary toModel(DiaryEntity entity) {
        if (entity == null) {
            return null;
        }

        var d = new Diary();
        d.setId(entity.getId());
        d.setDay(entity.getDay());
        d.setSituation(entity.getSituation());
        d.setThink(entity.getThink());
        d.setEmotions(entity.getEmotions());
        d.setReaction(entity.getReaction());
        d.setBodySensation(entity.getBodySensation());
        return d;
    }
}
