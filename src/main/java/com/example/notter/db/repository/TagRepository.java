package com.example.notter.db.repository;

import com.example.notter.db.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query("select t from Tag t where t.user.id = ?1")
    List<Tag> findByUserId(Integer id);
}
