package com.example.notter.services;

import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.UserRepo;
import com.example.notter.exception.UserAlreadyExistException;
import com.example.notter.model.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity findByLogin(String login) {
        return userRepo.findByEmail(login);
    }

    public UserEntity findByLoginAndPassword(String login, String password) {
        UserEntity u = findByLogin(login);
        if (u != null) {
            if (passwordEncoder.matches(password, u.getPassword())) {
                return u;
            }
        }

        return null;
    }

    public User add(UserEntity entity) throws UserAlreadyExistException {
        if (userRepo.findByEmail(entity.getEmail()) != null) {
            throw new UserAlreadyExistException();
        }

        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        return User.toModel(userRepo.save(entity));
    }

    public List<User> getAll() {
        return userRepo.findAll()
                .stream().map(User::toModel)
                .collect(Collectors.toList());
    }
}
