package com.example.notter.db.repository;

import com.example.notter.db.entity.NoteTodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NoteTodoRepo extends JpaRepository<NoteTodoEntity, Integer> {
    @Query("SELECT t FROM note_todo t WHERE t.note.id = ?1 AND t.id = ?2")
    NoteTodoEntity findByNoteAndId(Integer noteId, Integer todoId);
}