package com.example.notter.rest.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class AuthSigninRequest {
    @NotBlank(message = "Обязательное поле")
    private String login;

    @NotBlank(message = "Обязательное поле")
    private String password;
}
