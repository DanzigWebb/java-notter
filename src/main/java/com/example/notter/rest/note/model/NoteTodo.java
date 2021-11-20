package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteTodoEntity;
import lombok.Data;

@Data
public class NoteTodo {
    Integer id;
    Integer noteId;
    String title;
    Boolean checked;

    public static NoteTodo toModel(NoteTodoEntity entity) {
        var todo = new NoteTodo();
        todo.setId(entity.getId());
        todo.setNoteId(entity.getNote().getId());
        todo.setTitle(entity.getTitle());
        todo.setChecked(entity.getChecked());

        return todo;
    }
}
