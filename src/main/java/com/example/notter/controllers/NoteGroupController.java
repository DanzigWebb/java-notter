package com.example.notter.controllers;

import com.example.notter.db.entity.NoteGroup;
import com.example.notter.db.repository.NoteGroupRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/group")
public class NoteGroupController {

    private final NoteGroupRepository groupRepository;

    NoteGroupController(NoteGroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @PostMapping("add")
    public @ResponseBody
    NoteGroup add(@RequestParam String title, @RequestParam String description) {

        NoteGroup g = new NoteGroup();
        g.setTitle(title);
        g.setDescription(description);

        groupRepository.save(g);
        return g;
    }

    @GetMapping("all")
    public @ResponseBody
    Iterable<NoteGroup> getAll() {
        return groupRepository.findAll();
    }
}
