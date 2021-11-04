package com.example.notter.services;

import com.example.notter.db.entity.GroupEntity;
import com.example.notter.db.repository.GroupRepo;
import com.example.notter.model.Group;
import com.example.notter.util.Util;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private final GroupRepo groupRepo;

    public GroupService(GroupRepo groupRepo) {
        this.groupRepo = groupRepo;
    }

    public Group add(GroupEntity entity) {
        // Todo: добавить получение юзера из контекста
        // entity.setUser();
        return Group.toModel(groupRepo.save(entity));
    }

    public List<Group> getAll() {
        Iterable<GroupEntity> groups = groupRepo.findAll();

        return Util.IterableToList(groupRepo.findAll())
                .stream().map(Group::toModel)
                .collect(Collectors.toList());
    }

}
