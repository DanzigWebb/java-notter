package com.example.notter.controllers;

import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.UserRepo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserRepo userRepository;

    public UserController(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    UserEntity add(@RequestParam String name, @RequestParam String email) {

        UserEntity u = new UserEntity();
        u.setName(name);
        u.setEmail(email);
        userRepository.save(u);
        return u;
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<UserEntity> getAll() {
        return userRepository.findAll();
    }

}
