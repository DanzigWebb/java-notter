package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.entity.TagEntity;
import com.example.notter.rest.tag.model.Tag;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Note {

    Integer id;
    String title;
    String description;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    List<Tag> tags;


    public static Note toModel(NoteEntity entity) {
        Note n = new Note();
        n.setId(entity.getId());
        n.setTitle(entity.getTitle());
        n.setDescription(entity.getDescription());
        n.setCreateAt(entity.getCreatedAt());
        n.setUpdateAt(entity.getUpdatedAt());

        n.setTags(getTagsFromEntity(entity.getTags()));

        return n;
    }

    private static List<Tag> getTagsFromEntity(List<TagEntity> list) {
        if (list == null) {
            return new ArrayList<>();
        }

        return list
                .stream().map(Tag::toModel)
                .collect(Collectors.toList());
    }
}
