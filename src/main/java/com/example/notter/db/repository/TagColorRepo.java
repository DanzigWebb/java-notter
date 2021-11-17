package com.example.notter.db.repository;

import com.example.notter.db.entity.TagColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagColorRepo extends JpaRepository<TagColorEntity, Integer> {
}
