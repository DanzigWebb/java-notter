package com.example.notter.rest.tag;

import com.example.notter.db.entity.TagEntity;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.TagColorRepo;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.exception.EntityNotFoundException;
import com.example.notter.rest.tag.model.Tag;
import com.example.notter.rest.tag.model.TagColor;
import com.example.notter.rest.tag.model.TagRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepo tagRepo;
    private final TagColorRepo tagColorRepo;

    public TagService(TagRepo tagRepo, TagColorRepo tagColorRepo) {
        this.tagRepo = tagRepo;
        this.tagColorRepo = tagColorRepo;
    }

    public Tag create(TagRequest tag, UserEntity user) {
        TagEntity t = new TagEntity();
        t.setUser(user);
        t.setName(tag.getName());

        var color = tagColorRepo.findById(tag.getColor());
        color.ifPresent(t::setColor);

        return Tag.toModel(tagRepo.save(t));
    }

    public Tag update(Integer tagId, TagRequest tag, UserEntity user) {
        TagEntity t = tagRepo.findByUserAndId(user.getId(), tagId);
        if (t == null) {
            throw new EntityNotFoundException();
        }

        t.setName(tag.getName());
        var color = tagColorRepo.findById(tag.getColor());
        color.ifPresent(t::setColor);

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

    public List<TagColor> getColors() {
        return tagColorRepo.findAll()
                .stream().map(TagColor::toModel)
                .collect(Collectors.toList());
    }
}
