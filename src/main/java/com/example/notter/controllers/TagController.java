package com.example.notter.controllers;

import com.example.notter.db.entity.TagEntity;
import com.example.notter.db.repository.TagRepo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/tag")
public class TagController {

    private final TagRepo tagRepository;

    public TagController(TagRepo tagRepository) {
        this.tagRepository = tagRepository;
    }

    @PostMapping("add")
    public @ResponseBody
    TagEntity add(@RequestParam String name, @RequestParam String description) {

        TagEntity t = new TagEntity();
        t.setName(name);
        t.setColor(description);

        tagRepository.save(t);
        return t;
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<TagEntity> getAll(@RequestParam Integer userId) {
        if (userId != null) {
            return tagRepository.findByUserId(userId);
        }
        return tagRepository.findAll();
    }

}
