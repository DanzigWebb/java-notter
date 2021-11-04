package com.example.notter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class NotterApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotterApplication.class, args);
    }

}
