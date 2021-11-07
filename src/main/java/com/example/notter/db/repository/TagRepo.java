package com.example.notter.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.notter.db.entity.TagEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepo extends JpaRepository<TagEntity, Integer> {
    @Query("SELECT t FROM tag t WHERE t.user.id = ?1")
    List<TagEntity> findAllByUserId(Integer id);

    @Query("SELECT t FROM tag t WHERE t.user.id = ?1 AND t.id = ?2")
    TagEntity findByUserAndId(Integer userId, Integer tagId);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE tag t SET t.name = :name, t.color = :color WHERE t.id = :tagId AND t.user.id = :userId")
    void updateTagData(
            @Param("tagId") Integer tagId,
            @Param("userId") Integer userId,
            @Param("name") String name,
            @Param("color") String color
    );
}
