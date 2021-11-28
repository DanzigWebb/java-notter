package com.example.notter.rest.note.model;

import lombok.Data;

@Data
public class TodoOrderRequest {
    Integer entityId;
    Long order;
}
