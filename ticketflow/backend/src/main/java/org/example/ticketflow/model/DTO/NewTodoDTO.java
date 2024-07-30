package org.example.ticketflow.model.DTO;

import org.example.ticketflow.model.Priority;

public record NewTodoDTO(String title, String description, String username, Priority priority) {
}
