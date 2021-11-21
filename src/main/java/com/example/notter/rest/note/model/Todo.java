package com.example.notter.rest.note.model;

import com.example.notter.db.entity.NoteTodoEntity;
import lombok.Data;

@Data
public class Todo {
    Integer id;
    Integer noteId;
    String title;
    Boolean checked;

    public static Todo toModel(NoteTodoEntity entity) {
        var todo = new Todo();
        todo.setId(entity.getId());
        todo.setNoteId(entity.getNote().getId());
        todo.setTitle(entity.getTitle());
        todo.setChecked(entity.getChecked());

        return todo;
    }
}
