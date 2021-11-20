package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.entity.TagEntity;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
public class Note {

    Integer id;
    String title;
    String description;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    Boolean checked;

    List<Tag> tags;
    List<NoteTodo> todos;

    Integer groupId;


    public static Note toModel(NoteEntity entity) {
        Note n = new Note();
        n.setId(entity.getId());
        n.setTitle(entity.getTitle());
        n.setDescription(entity.getDescription());

        n.setChecked(entity.getChecked());

        n.setCreateAt(entity.getCreatedAt());
        n.setUpdateAt(entity.getUpdatedAt());

        n.setTags(Util.getModel(entity.getTags(), Tag::toModel));
        n.setTodos(Util.getModel(entity.getTodos(), NoteTodo::toModel));

        if (entity.getGroup() != null) {
            n.setGroupId(entity.getGroup().getId());
        } else {
            n.setGroupId(null);
        }

        return n;
    }

}
