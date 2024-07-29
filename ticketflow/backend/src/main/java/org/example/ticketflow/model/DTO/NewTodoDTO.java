package org.example.ticketflow.model.DTO;

import org.example.ticketflow.model.Member;
import org.example.ticketflow.model.Priority;

public record NewTodoDTO(String title, String description, Member member, Priority priority) {
}
