package com.example.notter.rest.dashboard.model;

import com.example.notter.db.entity.DashboardEntity;
import com.example.notter.rest.group.model.Group;
import com.example.notter.util.Util;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Dashboard {
    Integer id;
    String name;
    String description;
    LocalDateTime createAt;
    LocalDateTime updateAt;
    List<Group> groups;

    public static Dashboard toModel(DashboardEntity entity) {
        if (entity == null) {
            return null;
        }

        var d = new Dashboard();
        d.setId(entity.getId());
        d.setName(entity.getName());
        d.setDescription(entity.getDescription());
        d.setCreateAt(entity.getCreatedAt());
        d.setUpdateAt(entity.getUpdatedAt());
        d.setGroups(Util.entityListToModel(entity.getGroups(), Group::toModel));
        return d;
    }
}
