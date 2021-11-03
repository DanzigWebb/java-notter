package com.example.notter.controllers;

import com.example.notter.db.entity.Note;
import com.example.notter.db.entity.NoteRepository;
import com.example.notter.db.entity.User;
import com.example.notter.db.entity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("api/v1/note")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("add")
    public @ResponseBody
    String add(@RequestParam String title, @RequestParam String description) {

        Optional<User> u = userRepository.findById(1);
        Note n = new Note();

        n.setTitle(title);
        n.setDescription(description);
        u.ifPresent(n::setUser);

        noteRepository.save(n);
        return "Create";
    }

    @GetMapping("all")
    public @ResponseBody
    Iterable<Note> getAll() {
        return noteRepository.findAll();
    }
}
