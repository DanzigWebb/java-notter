package com.example.notter.services;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.model.Note;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final NoteRepo noteRepo;

    public NoteService(NoteRepo noteRepo) {
        this.noteRepo = noteRepo;
    }

    public Note add(NoteEntity entity) {
        // Todo: добавить получение юзера из контекста
        //  entity.setUser(1);
        return Note.toModel(noteRepo.save(entity));
    }

    public List<Note> getAll() {
        return noteRepo.findAll()
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }
}
