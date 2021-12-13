package com.example.notter.rest.dashboard;

import com.example.notter.db.entity.DashboardEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.DashboardRepo;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.dashboard.model.Dashboard;
import com.example.notter.rest.dashboard.model.DashboardCreateRequest;
import com.example.notter.rest.dashboard.model.DashboardUpdateRequest;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardRepo dashboardRepo;
    private final GroupRepo groupRepo;

    public DashboardService(DashboardRepo dashboardRepo, GroupRepo groupRepo) {
        this.dashboardRepo = dashboardRepo;
        this.groupRepo = groupRepo;
    }

    public Dashboard create(DashboardCreateRequest request, UserEntity user) {
        var d = new DashboardEntity();
        d.setUser(user);
        d.setName(request.getName());
        d.setDescription(request.getDescription());

        return Dashboard.toModel(dashboardRepo.save(d));
    }

    public Dashboard update(DashboardUpdateRequest request, Integer dashId, UserEntity user) {
        var dash = dashboardRepo.findByUser(user.getId(), dashId);
        if (dash == null) {
            throw new EntityNotFoundException();
        }

        dash.setName(request.getName());
        dash.setDescription(request.getDescription());

        if (request.getGroupId() != null) {
            var group = groupRepo.findByUser(user.getId(), request.getGroupId());
            var dashGroups = dash.getGroups();
            dashGroups.add(group);
            dash.setGroups(dashGroups);
        }

        return Dashboard.toModel(dashboardRepo.save(dash));
    }

    public List<Dashboard> getAll(UserEntity user) {
        var ds = dashboardRepo.findAllByUser(user.getId());
        return Util.entityListToModel(ds, Dashboard::toModel);
    }
}
