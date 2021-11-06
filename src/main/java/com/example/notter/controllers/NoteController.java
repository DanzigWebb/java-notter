package com.example.notter.controllers;

import com.example.notter.db.entity.NoteEntity;
import com.example.notter.model.Note;
import com.example.notter.services.NoteService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/note")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("add")
    public @ResponseBody
    Note add(@RequestBody NoteEntity entity) {
        return noteService.add(entity);
    }

    @GetMapping("all")
    public @ResponseBody
    List<Note> getAll() {
        return noteService.getAll();
    }
}
