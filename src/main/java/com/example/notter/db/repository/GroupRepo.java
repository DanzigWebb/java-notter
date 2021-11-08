package com.example.notter.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notter.db.entity.GroupEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GroupRepo extends JpaRepository<GroupEntity, Integer> {
    @Query("SELECT g FROM note_group g WHERE g.user.id = ?1")
    List<GroupEntity> findAllByUser(Integer userId);

    @Query("SELECT g FROM note_group g WHERE g.user.id = ?1 AND g.id = ?2")
    GroupEntity findByUserAndId(Integer userId, Integer noteId);
}
