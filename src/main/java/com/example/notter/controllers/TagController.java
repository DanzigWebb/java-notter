package com.example.notter.controllers;

import com.example.notter.db.entity.TagEntity;
import com.example.notter.model.Tag;
import com.example.notter.services.TagService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/tag")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("add")
    public @ResponseBody
    Tag add(@RequestBody TagEntity tag) {
        return tagService.add(tag);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    List<Tag> getAll() {
        return tagService.getAll();
    }

}
