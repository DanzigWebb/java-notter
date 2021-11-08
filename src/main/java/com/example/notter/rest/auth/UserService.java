package com.example.notter.rest.auth;

import com.example.notter.db.entity.UserEntity;
import com.example.notter.db.repository.UserRepo;
import com.example.notter.exception.UserAlreadyExistException;
import com.example.notter.rest.auth.model.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    public User create(UserEntity user) throws UserAlreadyExistException {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistException();
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return User.toModel(userRepo.save(user));
    }
}
