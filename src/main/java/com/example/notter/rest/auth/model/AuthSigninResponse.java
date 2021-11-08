package com.example.notter.rest.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthSigninResponse {
    private String token;
    private User user;
}
