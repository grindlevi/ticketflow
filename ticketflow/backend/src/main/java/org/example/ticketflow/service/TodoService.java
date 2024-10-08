package org.example.ticketflow.service;

import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewTodoDTO;
import org.example.ticketflow.model.DTO.TodoDTO;
import org.example.ticketflow.model.Member;
import org.example.ticketflow.model.Priority;
import org.example.ticketflow.model.Todo;
import org.example.ticketflow.model.TodoContainer;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository, MemberRepository memberRepository) {
        this.todoRepository = todoRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public TodoDTO createTodo(NewTodoDTO newTodoDTO) {
        try {
            Todo todoToSave = new Todo();
            todoToSave.setTitle(newTodoDTO.title());
            todoToSave.setDescription(newTodoDTO.description());
            todoToSave.setCompleted(false);
            todoToSave.setCreationDate(LocalDateTime.now());
            todoToSave.setTodoContainer(TodoContainer.BACKLOG);

            Priority priority = newTodoDTO.priority();
            System.out.println("Priority: " + priority);
            todoToSave.setPriority(priority);

            Member member = memberRepository.findByUsernameIgnoreCase(newTodoDTO.username()).orElseThrow();
           // todoToSave.setMember(member);
            member.addTodo(todoToSave);

            todoRepository.save(todoToSave);

            return toTodoDTO(todoToSave, member);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<TodoDTO> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();

        List<TodoDTO> todoDTOs = new ArrayList<>();
        for (Todo todo : todos) {
            Member member = memberRepository.findByUsernameIgnoreCase(todo.getMember().getUsername()).orElseThrow();
            todoDTOs.add(toTodoDTO(todo, member));
        }
        return todoDTOs;
    }

    public TodoDTO getTodo(UUID id) {
        Todo todo = todoRepository.getByPublicId(id)
                .orElseThrow(() -> new NoSuchElementException("Todo not found"));

        Member member = memberRepository.findByUsernameIgnoreCase(todo.getMember().getUsername()).orElseThrow();

        return toTodoDTO(todo, member);
    }

    public void deleteTodo(UUID id) {
        todoRepository.deleteByPublicId(id);
    }

    public TodoDTO updateTodo(TodoDTO todoDTO) {
        System.out.println("updated todo: " + todoDTO);
        Todo todo = todoRepository.getByPublicId(todoDTO.publicId())
                .orElseThrow(() -> new NoSuchElementException("Todo not found"));

        todo.setTitle(todoDTO.title());
        todo.setDescription(todoDTO.description());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setPriority(todoDTO.priority());
        todo.setTodoContainer(todoDTO.todoContainer());

        todoRepository.save(todo);

        Member member = memberRepository.findByUsernameIgnoreCase(todo.getMember().getUsername()).orElseThrow();

        return toTodoDTO(todo, member);
    }

    private TodoDTO toTodoDTO(Todo todo, Member member) {
        MemberDTO owner = toMemberDTO(member);
        return new TodoDTO(
                todo.getPublicId(),
                todo.getTitle(),
                todo.getDescription(),
                owner,
                todo.getPriority(),
                todo.isCompleted(),
                todo.getCreationDate(),
                todo.getTodoContainer()
        );
    }

    private MemberDTO toMemberDTO(Member member) {
        return new MemberDTO(
                member.getPublicId(),
                member.getUsername(),
                member.getRoles(),
                member.getTodos(),
                member.getCreatedAt()
        );
    }

    public List<TodoDTO> getAllTodosByMember(String username) {
        Member member = memberRepository.findByUsernameIgnoreCase(username).orElseThrow();
        List<Todo> todos = member.getTodos();

        List<TodoDTO> todoDTOs = new ArrayList<>();
        for (Todo todo : todos) {
            todoDTOs.add(toTodoDTO(todo, member));
        }
        return todoDTOs;
    }

    public List<TodoDTO> getSortedTodosByMember(String username, String criteria) {
        List<TodoDTO> todoDTOS = getAllTodosByMember(username);

        return switch (criteria) {
            case "creationDate" -> todoDTOS.stream()
                    .sorted(Comparator.comparing(TodoDTO::createdAt)).toList();
            case "priority" -> todoDTOS.stream()
                    .sorted(Comparator.comparing(TodoDTO::priority)).toList();
            default -> throw new RuntimeException("Invalid criteria: " + criteria);
        };
    }
}