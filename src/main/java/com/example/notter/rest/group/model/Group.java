package com.example.notter.rest.group.model;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.rest.note.model.Note;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Group {

    Integer id;
    Integer dashboardId;
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

        var g = new Group();
        g.setId(entity.getId());
        g.setDashboardId(entity.getDashboard().getId());
        g.setTitle(entity.getTitle());
        g.setDescription(entity.getDescription());
        g.setCreateAt(entity.getCreatedAt());
        g.setUpdateAt(entity.getUpdatedAt());
        g.setNotes(Util.entityListToModel(entity.getNotes(), Note::toModel));
        g.setNoteCount(g.getNotes().size());

        return g;
    }
}
