package org.example.ticketflow.controller;

import org.example.ticketflow.model.Todo;
import org.example.ticketflow.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/todos/{id}")
    public Optional<Todo> getTodoById(@PathVariable("id") Long id) {
        return todoService.getTodo(id);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteTodo(id);
    }

    @PatchMapping("/todos/{id}")
    public Todo updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }
}

