package com.example.notter.rest.tag;

import com.example.notter.config.security.CustomUserDetails;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.rest.tag.model.TagRequest;
import org.springframework.http.ResponseEntity;
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

    @PostMapping()
    public @ResponseBody
    Tag create(
            @Valid @RequestBody TagRequest tag,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return tagService.create(tag, user.getUserEntity());
    }

    @PutMapping("/{tagId}")
    public @ResponseBody
    Tag update(
            @PathVariable Integer tagId,
            @Valid @RequestBody TagRequest tag,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return tagService.update(tagId, tag, user.getUserEntity());
    }

    @DeleteMapping("/{tagId}")
    public @ResponseBody
    ResponseEntity<String> delete(
            @PathVariable Integer tagId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        tagService.delete(user.getUserEntity(), tagId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/{tagId}")
    public @ResponseBody
    Tag getById(
            @PathVariable Integer tagId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return tagService.getByUserAndId(user.getUserEntity(), tagId);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    List<Tag> getAll(@AuthenticationPrincipal CustomUserDetails user) {
        return tagService.getAllByUser(user.getUserEntity());
    }

}
