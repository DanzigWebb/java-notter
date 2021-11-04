package com.example.notter.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="Пользователь уже существует")
public class UserAlreadyExistException extends RuntimeException {
}
