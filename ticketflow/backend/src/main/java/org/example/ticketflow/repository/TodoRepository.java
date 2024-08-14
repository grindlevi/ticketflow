package org.example.ticketflow.repository;

import org.example.ticketflow.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Optional<Todo> getByPublicId(UUID id);

    void deleteByPublicId(UUID id);
}
