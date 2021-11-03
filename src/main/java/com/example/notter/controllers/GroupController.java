package com.example.notter.controllers;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.repository.GroupRepo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/group")
public class GroupController {

    private final GroupRepo groupRepository;

    GroupController(GroupRepo groupRepository) {
        this.groupRepository = groupRepository;
    }

    @PostMapping("add")
    public @ResponseBody
    GroupEntity add(@RequestParam String title, @RequestParam String description) {

        GroupEntity g = new GroupEntity();
        g.setTitle(title);
        g.setDescription(description);

        groupRepository.save(g);
        return g;
    }

    @GetMapping("all")
    public @ResponseBody
    Iterable<GroupEntity> getAll() {
        return groupRepository.findAll();
    }
}
