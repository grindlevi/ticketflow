package org.example.ticketflow.model.DTO;

import org.example.ticketflow.model.Priority;
import org.example.ticketflow.model.TodoContainer;

public record NewTodoDTO(String title, String description, String username, Priority priority, TodoContainer todoContainer) {
}
