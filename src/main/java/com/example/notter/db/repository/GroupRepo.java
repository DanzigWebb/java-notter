package com.example.notter.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notter.db.entity.GroupEntity;

public interface GroupRepo extends JpaRepository<GroupEntity, Integer> {
}
