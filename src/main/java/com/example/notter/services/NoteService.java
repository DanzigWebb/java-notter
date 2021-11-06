package com.example.notter.services;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.entity.UserEntity;
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

    public Note add(NoteEntity note, UserEntity user) {
        note.setUser(user);
        return Note.toModel(noteRepo.save(note));
    }

    public List<Note> getAll() {
        return noteRepo.findAll()
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }

    public List<Note> getAllByUser(Integer userId) {
        return noteRepo.findAllByUser(userId)
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }
}
