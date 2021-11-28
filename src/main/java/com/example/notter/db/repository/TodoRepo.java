package com.example.notter.db.repository;

import com.example.notter.db.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepo extends JpaRepository<TodoEntity, Integer> {
    @Query("SELECT t FROM todo t WHERE t.note.id = ?1 AND t.id = ?2")
    TodoEntity findByNoteAndId(Integer noteId, Integer todoId);

    @Query("SELECT t FROM todo t WHERE t.note.user.id = ?1 AND t.id = ?2")
    TodoEntity findByUserAndId(Integer userId, Integer todoId);

    @Query("SELECT t FROM todo t WHERE t.note.user.id = ?1 AND t.id IN ?2")
    List<TodoEntity> findAllByUserAndIds(Integer userId, List<Integer> todoId);
}