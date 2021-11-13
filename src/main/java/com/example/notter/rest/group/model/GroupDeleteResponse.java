package com.example.notter.rest.group.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GroupDeleteResponse {
    Integer groupId;
    String status;
}
