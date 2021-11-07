package com.example.notter.exception.validation;

public record ValidationErrorField(
        String fieldName,
        String message
) {
}