package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Note {

    Integer id;
    String title;
    String description;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    Boolean checked;

    List<Tag> tags;
    List<Todo> todos;

    Integer groupId;


    public static Note toModel(NoteEntity entity) {
        var n = new Note();
        n.setId(entity.getId());
        n.setTitle(entity.getTitle());
        n.setDescription(entity.getDescription());

        n.setChecked(entity.getChecked());

        n.setCreateAt(entity.getCreatedAt());
        n.setUpdateAt(entity.getUpdatedAt());

        n.setTags(Util.entityListToModel(entity.getTags(), Tag::toModel));
        n.setTodos(Util.entityListToModel(entity.getTodos(), Todo::toModel));

        if (entity.getGroup() != null) {
            n.setGroupId(entity.getGroup().getId());
        } else {
            n.setGroupId(null);
        }

        return n;
    }

}
