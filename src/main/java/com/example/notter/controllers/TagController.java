package com.example.notter.controllers;

import com.example.notter.db.entity.Tag;
import com.example.notter.db.repository.TagRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/tag")
public class TagController {

    private final TagRepository tagRepository;

    public TagController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @PostMapping("add")
    public @ResponseBody
    Tag add(@RequestParam String name, @RequestParam String description) {

        Tag t = new Tag();
        t.setName(name);
        t.setColor(description);

        tagRepository.save(t);
        return t;
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Tag> getAll(@RequestParam Integer userId) {
        if (userId != null) {
            return tagRepository.findByUserId(userId);
        }
        return tagRepository.findAll();
    }

}
