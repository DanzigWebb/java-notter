package com.example.notter.services;

import com.example.notter.db.entity.TagEntity;
import com.example.notter.db.repository.TagRepo;
import com.example.notter.model.Tag;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepo tagRepo;

    public TagService(TagRepo tagRepo) {
        this.tagRepo = tagRepo;
    }

    public Tag add(TagEntity entity) {
        return Tag.toModel(tagRepo.save(entity));
    }

    public List<Tag> getAll() {
        return Util.IterableToList(tagRepo.findAll())
                .stream().map(Tag::toModel)
                .collect(Collectors.toList());
    }

}
