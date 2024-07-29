package org.example.ticketflow.controller;

import org.example.ticketflow.model.DTO.NewTodoDTO;
import org.example.ticketflow.model.DTO.TodoDTO;
import org.example.ticketflow.model.Todo;
import org.example.ticketflow.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/todos")
    public TodoDTO createTodo(@RequestBody NewTodoDTO newTodoDto) {
        return todoService.createTodo(newTodoDto);
    }

    @GetMapping("/todos")
    public List<TodoDTO> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/todos/{id}")
    public TodoDTO getTodoById(@PathVariable("id") UUID id) {
        return todoService.getTodo(id);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable("id") UUID publicId) {
        todoService.deleteTodo(publicId);
    }

    @PatchMapping("/todos")
    public TodoDTO updateTodo(@RequestBody TodoDTO todoDTO) {
        return todoService.updateTodo(todoDTO);
    }
}

