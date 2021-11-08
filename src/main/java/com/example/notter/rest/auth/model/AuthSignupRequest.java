package com.example.notter.rest.auth.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class AuthSignupRequest {
    @NotBlank(message = "Обязательное поле")
    @Email(message = "Невалидный Email")
    private String email;

    @NotBlank(message = "Обязательное поле")
    private String name;

    @NotBlank(message = "Обязательное поле")
    @Length(min = 6, message = "Пароль должен содержать минимум 6 символов")
    private String password;
}
