package com.example.notter.services;

import com.example.notter.db.entity.TagEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.model.Tag;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepo tagRepo;

    public TagService(TagRepo tagRepo) {
        this.tagRepo = tagRepo;
    }

    public Tag add(TagEntity tag) {
        return Tag.toModel(tagRepo.save(tag));
    }

    public Tag update(Integer tagId, TagEntity tag, UserEntity user) {
        TagEntity t = tagRepo.findByUserAndId(user.getId(), tagId);
        if (t != null) {
            if (tag.getName() != null) {
                t.setName(tag.getName());
            }

            if (tag.getColor() != null) {
                t.setColor(tag.getColor());
            }
        } else {
            throw new EntityNotFoundException();
        }

        return Tag.toModel(tagRepo.save(t));
    }

    public void delete(UserEntity user, Integer tagId) {
        TagEntity t = tagRepo.findByUserAndId(user.getId(), tagId);
        tagRepo.delete(t);
    }

    public List<Tag> getAllByUser(UserEntity user) {
        return tagRepo.findAllByUserId(user.getId())
                .stream().map(Tag::toModel)
                .collect(Collectors.toList());
    }

    public Tag getByUserAndId(UserEntity user, Integer tagId) {
        TagEntity t = tagRepo.findByUserAndId(user.getId(), tagId);

        if (t != null) {
            return Tag.toModel(t);
        }

        throw new EntityNotFoundException();
    }

}
