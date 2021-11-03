package com.example.notter.db.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.notter.db.entity.GroupEntity;

public interface GroupRepo extends CrudRepository<GroupEntity, Integer> {
}
