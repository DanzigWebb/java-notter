package com.example.notter.db.repository;

import com.example.notter.db.entity.NoteTodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteTodoRepo extends JpaRepository<NoteTodoEntity, Integer> {
}