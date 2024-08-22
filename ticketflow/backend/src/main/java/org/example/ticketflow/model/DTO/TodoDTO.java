package org.example.ticketflow.model.DTO;

import org.example.ticketflow.model.Priority;
import org.example.ticketflow.model.TodoContainer;

import java.time.LocalDateTime;
import java.util.UUID;

public record TodoDTO(UUID publicId,
                      String title,
                      String description,
                      MemberDTO memberDTO,
                      Priority priority,
                      boolean isCompleted,
                      LocalDateTime createdAt,
                      TodoContainer todoContainer) {}
