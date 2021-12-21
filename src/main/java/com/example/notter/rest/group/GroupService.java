package com.example.notter.rest.group;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.DashboardRepo;
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
    private final DashboardRepo dashboardRepo;

    public GroupService(GroupRepo groupRepo, DashboardRepo dashboardRepo) {
        this.groupRepo = groupRepo;
        this.dashboardRepo = dashboardRepo;
    }

    public Group create(GroupRequest group, UserEntity user) {
        var d = dashboardRepo.findByUser(user.getId(), group.getDashboardId());
        if (d == null) {
            throw new EntityNotFoundException();
        }

        var g = new GroupEntity();
        g.setUser(user);
        g.setTitle(group.getTitle());
        g.setDescription(group.getDescription());
        g.setDashboard(d);

        return Group.toModel(groupRepo.save(g));
    }

    public Group update(Integer groupId, GroupRequest group, UserEntity user) {
        var g = groupRepo.findByUser(user.getId(), groupId);
        if (g == null) {
            throw new EntityNotFoundException();
        }

        g.setTitle(group.getTitle());
        g.setDescription(group.getDescription());

        return Group.toModel(groupRepo.save(g));
    }

    public void delete(UserEntity user, Integer groupId) {
        var g = groupRepo.findByUser(user.getId(), groupId);
        groupRepo.delete(g);
    }

    public List<Group> getAllByUser(Integer userId) {
        var groups = groupRepo.findAllByUser(userId);
        return Util.entityListToModel(groups, Group::toModel);
    }

    public Group getByUserAndId(UserEntity user, Integer groupId) {
        var g = groupRepo.findByUser(user.getId(), groupId);

        if (g != null) {
            return Group.toModel(g);
        }

        throw new EntityNotFoundException();
    }
}
