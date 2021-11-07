package com.example.notter.exception.validation;

import java.util.List;

public record ValidationErrorResponse(
        Integer status,
        String message,
        List<ValidationErrorField> errors
) {
}
