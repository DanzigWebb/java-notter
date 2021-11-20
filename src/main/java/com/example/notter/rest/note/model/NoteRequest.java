package com.example.notter.rest.note.model;

import com.example.notter.rest.tag.model.Tag;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class NoteRequest {

    @NotBlank(message = "Обязательное поле")
    String title;

    String description;

    Integer groupId;

    Boolean checked;

    List<Tag> tags;
    List<NoteTodo> todos;
}
