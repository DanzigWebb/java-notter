package com.example.notter.rest.note;

import com.example.notter.db.entity.*;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.db.repository.NoteTodoRepo;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.note.model.Note;
import com.example.notter.rest.note.model.NoteRequest;
import com.example.notter.rest.note.model.Todo;
import com.example.notter.rest.note.model.TodoRequest;
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

    private static NoteTodoEntity createNoteTodo(Todo t, NoteEntity note) {
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
        return Util.entityListToModel(
                noteRepo.findAllByUser(userId),
                Note::toModel
        );
    }

    public Note getByUserAndId(UserEntity user, Integer noteId) {
        var note = getNote(user.getId(), noteId);
        return Note.toModel(note);
    }

    public Todo addTodo(UserEntity user, Integer noteId, TodoRequest todoRequest) {
        var note = getNote(user.getId(), noteId);

        var todo = new NoteTodoEntity();
        todo.setTitle(todoRequest.getTitle());
        todo.setNote(note);

        return Todo.toModel(noteTodoRepo.save(todo));
    }

    public Todo updateTodo(UserEntity user, Integer noteId, Integer todoId, TodoRequest todoRequest) {
        var note = getNote(user.getId(), noteId);
        var todo = getTodo(note.getId(), todoId);

        todo.setChecked(todoRequest.getChecked());
        todo.setTitle(todoRequest.getTitle());

        return Todo.toModel(noteTodoRepo.save(todo));
    }

    public void deleteTodo(UserEntity user, Integer noteId, Integer todoId) {
        var note = getNote(user.getId(), noteId);
        var todo = getTodo(note.getId(), todoId);

        noteTodoRepo.delete(todo);
    }

    private NoteEntity getNote(Integer userId, Integer noteId) {
        var note = noteRepo.findByUserAndId(userId, noteId);
        if (note == null) {
            throw new EntityNotFoundException();
        }

        return note;
    }

    private NoteTodoEntity getTodo(Integer noteId, Integer todoId) {
        var todo = noteTodoRepo.findByNoteAndId(noteId, todoId);
        if (todo == null) {
            throw new EntityNotFoundException();
        }

        return todo;
    }
}
