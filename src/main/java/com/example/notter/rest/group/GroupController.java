package com.example.notter.rest.group;

import com.example.notter.config.security.CustomUserDetails;
import com.example.notter.rest.group.model.Group;
import com.example.notter.rest.group.model.GroupDeleteResponse;
import com.example.notter.rest.group.model.GroupRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("api/v1/group")
@Validated
public class GroupController {

    private final GroupService groupService;

    GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping()
    public @ResponseBody
    Group create(
            @Valid @RequestBody GroupRequest group,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return groupService.create(group, user.getUserEntity());
    }

    @GetMapping()
    public @ResponseBody
    List<Group> getAllByUser(@AuthenticationPrincipal CustomUserDetails user) {
        return groupService.getAllByUser(user.getUserEntity().getId());
    }

    @PutMapping("/{groupId}")
    public @ResponseBody
    Group update(
            @PathVariable Integer groupId,
            @Valid @RequestBody GroupRequest group,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return groupService.update(groupId, group, user.getUserEntity());
    }

    @DeleteMapping("/{groupId}")
    public @ResponseBody
    GroupDeleteResponse delete(
            @PathVariable Integer groupId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        groupService.delete(user.getUserEntity(), groupId);

        return new GroupDeleteResponse(groupId, "success");
    }

    @GetMapping("/{groupId}")
    public @ResponseBody
    Group getById(
            @PathVariable Integer groupId,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        return groupService.getByUserAndId(user.getUserEntity(), groupId);
    }

}
