package com.example.notter.rest.note;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.entity.NoteEntity;
import com.example.notter.db.entity.TagEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.db.repository.NoteRepo;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.note.model.Note;
import com.example.notter.rest.note.model.NoteRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final NoteRepo noteRepo;
    private final GroupRepo groupRepo;
    private final TagRepo tagRepo;

    public NoteService(NoteRepo noteRepo, GroupRepo groupRepo, TagRepo tagRepo) {
        this.noteRepo = noteRepo;
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

        if (note.getTagsIds() != null && note.getTagsIds().size() > 0) {
            List<TagEntity> tags = tagRepo.findAllByUserId(user.getId());

            List<TagEntity> filteredTags = new ArrayList<>();
            tags.forEach(tag -> {
                if (note.getTagsIds().contains(tag.getId())) {
                    filteredTags.add(tag);
                }
            });

            n.setTags(filteredTags);
        }

        n.setTitle(note.getTitle());
        n.setDescription(note.getDescription());

        return Note.toModel(noteRepo.save(n));
    }

    public void delete(UserEntity user, Integer tagId) {
        NoteEntity n = noteRepo.findByUserAndId(user.getId(), tagId);
        noteRepo.delete(n);
    }

    public List<Note> getAllByUser(Integer userId) {
        return noteRepo.findAllByUser(userId)
                .stream().map(Note::toModel)
                .collect(Collectors.toList());
    }

    public Note getByUserAndId(UserEntity user, Integer tagId) {
        NoteEntity t = noteRepo.findByUserAndId(user.getId(), tagId);

        if (t != null) {
            return Note.toModel(t);
        }

        throw new EntityNotFoundException();
    }
}
