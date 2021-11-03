package com.example.notter.controllers;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.UserRepo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("api/v1/note")
public class NoteController {

    private final NoteRepo noteRepository;

    private final UserRepo userRepository;

    public NoteController(
            NoteRepo noteRepository,
            UserRepo userRepository
    ) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("add")
    public @ResponseBody
    NoteEntity add(@RequestParam String title, @RequestParam String description) {

        Optional<UserEntity> u = userRepository.findById(1);
        NoteEntity n = new NoteEntity();

        n.setTitle(title);
        n.setDescription(description);
        u.ifPresent(n::setUser);

        noteRepository.save(n);
        return n;
    }

    @GetMapping("all")
    public @ResponseBody
    Iterable<NoteEntity> getAll() {
        return noteRepository.findAll();
    }
}
