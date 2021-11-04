package com.example.notter.controllers;

import com.example.notter.db.entity.UserEntity;
import com.example.notter.exception.UserAlreadyExistException;
import com.example.notter.model.User;
import com.example.notter.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/add")
    public @ResponseBody
    User add(@RequestBody UserEntity user) throws UserAlreadyExistException {
        return userService.add(user);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    List<User> getAll() {
        return userService.getAll();
    }

}
