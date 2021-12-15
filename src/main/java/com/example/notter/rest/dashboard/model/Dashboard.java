package com.example.notter.rest.dashboard.model;

import com.example.notter.db.entity.DashboardEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Dashboard {
    Integer id;
    String name;
    String description;
    LocalDateTime createAt;
    LocalDateTime updateAt;

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
        return d;
    }
}
