package com.example.notter.db.repository;

import com.example.notter.db.entity.Note;
import org.springframework.data.repository.CrudRepository;

public interface NoteRepository extends CrudRepository<Note, Integer> {

}
