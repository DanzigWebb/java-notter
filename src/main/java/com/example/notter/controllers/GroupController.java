package com.example.notter.controllers;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.model.Group;
import com.example.notter.services.GroupService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/group")
public class GroupController {

    private final GroupService groupService;

    GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("add")
    public @ResponseBody
    Group add(@RequestBody GroupEntity entity) {
        return groupService.add(entity);
    }

    @GetMapping("all")
    public @ResponseBody
    Iterable<Group> getAll() {
        return groupService.getAll();
    }
}
