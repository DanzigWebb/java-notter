package com.example.notter.services;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.model.Note;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class NoteService {

    private final NoteRepo noteRepo;

    public NoteService(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    public Note add(NoteEntity entity) {
        // Todo: добавить получение юзера из контекста
        entity.setId(1);
        return Note.toModel(noteRepo.save(entity));
    }

    public List<Note> getAll() {
        return StreamSupport.stream(noteRepo.findAll().spliterator(), false)
                .collect(Collectors.toList())
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }
}
