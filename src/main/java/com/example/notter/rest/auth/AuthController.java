package com.example.notter.rest.auth;

import com.example.notter.config.security.jwt.JwtProvider;
import com.example.notter.db.entity.UserEntity;
import com.example.notter.rest.auth.model.AuthSigninRequest;
import com.example.notter.rest.auth.model.AuthSigninResponse;
import com.example.notter.rest.auth.model.AuthSignupRequest;
import com.example.notter.rest.auth.model.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController()
@Validated
public class AuthController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public AuthController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("auth/sign-up")
    public User registerUser(@Valid @RequestBody AuthSignupRequest request) {
        UserEntity u = new UserEntity();
        u.setPassword(request.getPassword());
        u.setEmail(request.getEmail());
        u.setName(request.getName());

        return userService.create(u);
    }

    @PostMapping("auth/sign-in")
    public AuthSigninResponse auth(@Valid @RequestBody AuthSigninRequest request) {
        UserEntity userEntity = userService.findByLoginAndPassword(request.getLogin(), request.getPassword());
        String token = jwtProvider.generateToken(userEntity.getEmail());

        User u = User.toModel(userEntity);
        return new AuthSigninResponse(token, u);
    }
}
