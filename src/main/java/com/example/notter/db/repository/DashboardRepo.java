package com.example.notter.db.repository;

import com.example.notter.db.entity.DashboardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DashboardRepo extends JpaRepository<DashboardEntity, Integer> {
    @Query("SELECT d FROM dashboard d WHERE d.user.id = ?1")
    List<DashboardEntity> findAllByUser(Integer userId);

    @Query("SELECT d FROM dashboard d WHERE d.user.id = ?1 AND d.id = ?2")
    DashboardEntity findByUser(Integer userId, Integer dashId);
}
