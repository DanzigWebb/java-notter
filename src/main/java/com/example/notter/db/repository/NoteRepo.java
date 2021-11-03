package com.example.notter.db.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.notter.db.entity.NoteEntity;

public interface NoteRepo extends CrudRepository<NoteEntity, Integer> {
}
