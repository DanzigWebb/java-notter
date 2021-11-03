package com.example.notter.db.repository;

import com.example.notter.db.entity.NoteGroup;
import org.springframework.data.repository.CrudRepository;

public interface NoteGroupRepository extends CrudRepository<NoteGroup, Integer> {
}
