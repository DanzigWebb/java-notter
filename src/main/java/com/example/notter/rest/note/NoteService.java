package com.example.notter.rest.note;

import com.example.notter.db.entity.*;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.db.repository.NoteTodoRepo;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.note.model.Note;
import com.example.notter.rest.note.model.NoteRequest;
import com.example.notter.rest.note.model.NoteTodo;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final NoteRepo noteRepo;
    private final NoteTodoRepo noteTodoRepo;
    private final GroupRepo groupRepo;
    private final TagRepo tagRepo;

    public NoteService(NoteRepo noteRepo, NoteTodoRepo noteTodoRepo, GroupRepo groupRepo, TagRepo tagRepo) {
        this.noteRepo = noteRepo;
        this.noteTodoRepo = noteTodoRepo;
        this.groupRepo = groupRepo;
        this.tagRepo = tagRepo;
    }

    public Note create(NoteRequest note, UserEntity user) {
        NoteEntity n = new NoteEntity();
        n.setUser(user);
        n.setTitle(note.getTitle());
        n.setDescription(note.getDescription());

        if (note.getGroupId() != null) {
            GroupEntity g = groupRepo.findByUserAndId(user.getId(), note.getGroupId());
            n.setGroup(g);
        }

        return Note.toModel(noteRepo.save(n));
    }

    public Note update(Integer noteId, NoteRequest note, UserEntity user) {
        NoteEntity n = noteRepo.findByUserAndId(user.getId(), noteId);
        if (n == null) {
            throw new EntityNotFoundException();
        }

        if (note.getTags() != null) {
            var tagIds = note.getTags()
                    .stream().map(Tag::getId)
                    .collect(Collectors.toList());

            List<TagEntity> tags = tagRepo.findAllByUserAndIds(user.getId(), tagIds);
            n.setTags(tags);
        }

        if (note.getTodos() != null) {
            note.getTodos().forEach(t -> {
                var todo = noteTodoRepo.findById(t.getId());
                if (todo.isEmpty()) {
                    var noteTodo = createNoteTodo(t, n);
                    noteTodoRepo.save(noteTodo);
                }
            });
        }

        n.setTitle(note.getTitle());
        n.setDescription(note.getDescription());
        n.setChecked(note.getChecked());

        return Note.toModel(noteRepo.save(n));
    }

    private static NoteTodoEntity createNoteTodo(NoteTodo t, NoteEntity note) {
        var todo = new NoteTodoEntity();
        todo.setTitle(t.getTitle());
        todo.setChecked(t.getChecked());
        todo.setNote(note);

        return todo;
    }

    public void delete(UserEntity user, Integer tagId) {
        NoteEntity n = noteRepo.findByUserAndId(user.getId(), tagId);
        noteRepo.delete(n);
    }

    public List<Note> getAllByUser(Integer userId) {
        return Util.listToModel(
                noteRepo.findAllByUser(userId),
                Note::toModel
        );
    }

    public Note getByUserAndId(UserEntity user, Integer tagId) {
        NoteEntity t = noteRepo.findByUserAndId(user.getId(), tagId);

        if (t != null) {
            return Note.toModel(t);
        }

        throw new EntityNotFoundException();
    }
}
