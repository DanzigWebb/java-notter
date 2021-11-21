package com.example.notter.db.repository;

import com.example.notter.db.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepo extends JpaRepository<TodoEntity, Integer> {
    @Query("SELECT t FROM todo t WHERE t.note.id = ?1 AND t.id = ?2")
    TodoEntity findByNoteAndId(Integer noteId, Integer todoId);
}