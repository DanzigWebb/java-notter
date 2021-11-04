package com.example.notter.model;

import com.example.notter.db.entity.UserEntity;

public class User {
    Integer id;
    String name;
    String email;

    public static User toModel(UserEntity entity) {
        User u = new User();
        u.setId(entity.getId());
        u.setName(entity.getName());
        u.setEmail(entity.getEmail());

        return u;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
