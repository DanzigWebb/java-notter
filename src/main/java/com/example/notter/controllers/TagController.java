package com.example.notter.controllers;

import com.example.notter.db.entity.Tag;
import com.example.notter.db.entity.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/tag")
public class TagController {

    @Autowired
    TagRepository tagRepository;

    @PostMapping("add")
    public @ResponseBody
    String add(@RequestParam String name, @RequestParam String description) {

        Tag t = new Tag();
        t.setName(name);
        t.setColor(description);

        tagRepository.save(t);
        return "Create";
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Tag> getAll() {
        return tagRepository.findAll();
    }

}
