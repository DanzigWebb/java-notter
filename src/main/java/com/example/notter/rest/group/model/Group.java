package com.example.notter.rest.group.model;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.entity.NoteEntity;
import com.example.notter.rest.note.model.Note;
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
    int noteCount;

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
        g.setNoteCount(g.getNotes().size());

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
