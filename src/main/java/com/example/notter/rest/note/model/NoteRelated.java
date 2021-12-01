package com.example.notter.rest.note.model;


import com.example.notter.db.entity.NoteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoteRelated {
    Integer id;
    Integer groupId;
    String title;
    String description;
    Boolean checked;

    static NoteRelated fromEntity(NoteEntity note) {
        return new NoteRelated(
                note.getId(),
                note.getGroup().getId(),
                note.getTitle(),
                note.getDescription(),
                note.getChecked()
        );
    }
}
