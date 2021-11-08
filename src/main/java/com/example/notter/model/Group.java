package com.example.notter.model;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.entity.NoteEntity;
import com.example.notter.rest.note.model.Note;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Group {

    Integer id;
    String title;
    String description;
    LocalDateTime createAt;
    LocalDateTime updateAt;
    List<Note> notes;

    public static Group toModel(GroupEntity entity) {
        if (entity == null) {
            return null;
        }

        Group g = new Group();
        g.setId(entity.getId());
        g.setTitle(entity.getTitle());
        g.setDescription(entity.getDescription());
        g.setCreateAt(entity.getCreatedAt());
        g.setUpdateAt(entity.getUpdatedAt());
        g.setNotes(getNotesList(entity.getNotes()));

        return g;
    }

    private static List<Note> getNotesList(List<NoteEntity> list) {
        if (list == null) {
            return new ArrayList<>();
        }

        return list
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }
}
