package com.example.notter.exception.validation;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

/**
 * Обработчик ошибок валидации
 */
@ControllerAdvice
public class ErrorHandlingControllerAdvice {

    /**
     * Формирование кастомного вывода ошибки валидации
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ValidationErrorResponse onMethodArgumentNotValidException(
            MethodArgumentNotValidException e
    ) {
        final List<ValidationErrorField> errors = e.getBindingResult().getFieldErrors().stream()
                .map(error -> new ValidationErrorField(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());

        var message = "Validation Error";

        return new ValidationErrorResponse(
                BAD_REQUEST.value(),
                message,
                errors
        );
    }

}
