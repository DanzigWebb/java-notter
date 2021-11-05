package com.example.notter.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notter.db.entity.NoteEntity;

public interface NoteRepo extends JpaRepository<NoteEntity, Integer> {
}
