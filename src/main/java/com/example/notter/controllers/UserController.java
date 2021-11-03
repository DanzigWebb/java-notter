package com.example.notter.controllers;

import com.example.notter.db.entity.User;
import com.example.notter.db.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    User add(@RequestParam String name, @RequestParam String email) {

        User u = new User();
        u.setName(name);
        u.setEmail(email);
        userRepository.save(u);
        return u;
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<User> getAll() {
        return userRepository.findAll();
    }

}
