package org.example.ticketflow.model.DTO;

import org.example.ticketflow.model.Role;
import org.example.ticketflow.model.Todo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record MemberDTO(UUID publicId, String username, Set<Role> roles, List<Todo> todos, LocalDateTime createdAt) {
}
