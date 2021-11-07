package com.example.notter.controllers;

import com.example.notter.config.CustomUserDetails;
import com.example.notter.db.entity.TagEntity;
import com.example.notter.model.Tag;
import com.example.notter.services.TagService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("api/v1/tag")
@Validated
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("add")
    public @ResponseBody
    Tag create(
            @Valid @RequestBody TagEntity tag,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        tag.setUser(user.getUserEntity());
        return tagService.add(tag);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    List<Tag> getAll(@AuthenticationPrincipal CustomUserDetails user) {
        return tagService.getAllByUser(user.getUserEntity());
    }

}
