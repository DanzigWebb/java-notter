package com.example.notter.rest.diary;

import com.example.notter.db.entity.DiaryEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.DiaryRepo;
import com.example.notter.rest.diary.model.Diary;
import com.example.notter.rest.diary.model.DiaryCreateRequest;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DiaryService {
    private final DiaryRepo diaryRepo;

    public DiaryService(DiaryRepo diaryRepo) {
        this.diaryRepo = diaryRepo;
    }

    public Diary create(DiaryCreateRequest request, UserEntity user) {
        var d = new DiaryEntity();
        d.setUser(user);
        d.setDay(request.getDay());
        d.setSituation(request.getSituation());
        d.setThink(request.getThink());
        d.setEmotions(request.getEmotions());
        d.setReaction(request.getReaction());
        d.setBodySensation(request.getBodySensation());

        return Diary.toModel(diaryRepo.save(d));
    }

    public List<Diary> getByRange(Date from, Date to, UserEntity user) {
        var list = diaryRepo.getByRange(from, to, user.getId());

        if (list == null) {
            return new ArrayList<>();
        }

        if (list.size() == 0) {
            return new ArrayList<>();
        }

        return Util.entityListToModel(list, Diary::toModel);
    }
}
