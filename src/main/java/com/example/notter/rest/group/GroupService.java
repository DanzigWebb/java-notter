package com.example.notter.rest.group;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.group.model.Group;
import com.example.notter.rest.group.model.GroupRequest;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    private final GroupRepo groupRepo;

    public GroupService(GroupRepo groupRepo) {
        this.groupRepo = groupRepo;
    }

    public Group create(GroupRequest group, UserEntity user) {
        GroupEntity g = new GroupEntity();
        g.setUser(user);
        g.setTitle(group.getTitle());
        g.setDescription(group.getDescription());

        return Group.toModel(groupRepo.save(g));
    }

    public Group update(Integer groupId, GroupRequest group, UserEntity user) {
        GroupEntity g = groupRepo.findByUserAndId(user.getId(), groupId);
        if (g == null) {
            throw new EntityNotFoundException();
        }

        g.setTitle(group.getTitle());
        g.setDescription(group.getDescription());

        return Group.toModel(groupRepo.save(g));
    }

    public void delete(UserEntity user, Integer groupId) {
        GroupEntity g = groupRepo.findByUserAndId(user.getId(), groupId);
        groupRepo.delete(g);
    }

    public List<Group> getAllByUser(Integer userId) {
        var groups = groupRepo.findAllByUser(userId);
        return Util.listToModel(groups, Group::toModel);
    }

    public Group getByUserAndId(UserEntity user, Integer groupId) {
        GroupEntity g = groupRepo.findByUserAndId(user.getId(), groupId);

        if (g != null) {
            return Group.toModel(g);
        }

        throw new EntityNotFoundException();
    }
}
