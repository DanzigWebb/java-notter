package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Note {

    Integer id;
    String title;
    String description;
    Long order;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    Boolean checked;

    List<Tag> tags;
    List<Todo> todos;
    List<NoteRelated> relatedNotes;

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
        n.setOrder(entity.getOrderIndex());
        n.setRelatedNotes(getRelatedNotes(entity.getRelatedNotes()));

        if (entity.getGroup() != null) {
            n.setGroupId(entity.getGroup().getId());
        } else {
            n.setGroupId(null);
        }

        return n;
    }

    static List<NoteRelated> getRelatedNotes(List<NoteEntity> list) {
        return list
                .stream().map(NoteRelated::fromEntity)
                .collect(Collectors.toList());
    }

}
