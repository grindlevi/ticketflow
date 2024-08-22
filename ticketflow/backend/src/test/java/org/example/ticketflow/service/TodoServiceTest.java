package org.example.ticketflow.service;

import org.example.ticketflow.model.*;
import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewTodoDTO;
import org.example.ticketflow.model.DTO.TodoDTO;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class TodoServiceTest {

    @InjectMocks
    private TodoService todoService;

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Transactional
    void createTodo_success() {
        NewTodoDTO newTodoDTO = new NewTodoDTO("title", "description", "username", Priority.LOW, TodoContainer.BACKLOG);

        Member member = new Member();
        member.setUsername("username");
        member.setPassword("password");
        member.setRoles(Set.of(Role.ROLE_USER));
        member.setCreatedAt(LocalDateTime.now());

        Todo todoToSave = new Todo();
        todoToSave.setTitle(newTodoDTO.title());
        todoToSave.setDescription(newTodoDTO.description());
        todoToSave.setCompleted(false);
        todoToSave.setCreationDate(LocalDateTime.now());
        todoToSave.setPriority(newTodoDTO.priority());
        todoToSave.setMember(member);

        when(memberRepository.findByUsernameIgnoreCase(anyString())).thenReturn(Optional.of(member));
        when(todoRepository.save(any(Todo.class))).thenReturn(todoToSave);

        TodoDTO result = todoService.createTodo(newTodoDTO);

        assertNotNull(result);
        assertEquals(newTodoDTO.title(), result.title());
        assertEquals(newTodoDTO.description(), result.description());
        assertEquals(newTodoDTO.priority(), result.priority());
        assertFalse(result.isCompleted());
    }

    @Test
    void createTodo_memberNotFound() {
        NewTodoDTO newTodoDTO = new NewTodoDTO("title", "description", "username", Priority.HIGH, TodoContainer.BACKLOG);

        when(memberRepository.findByUsernameIgnoreCase(anyString())).thenReturn(Optional.empty());

        RuntimeException thrown = assertThrows(
                RuntimeException.class,
                () -> todoService.createTodo(newTodoDTO)
        );

        assertEquals("java.util.NoSuchElementException: No value present", thrown.getMessage());
    }

    @Test
    void getAllTodos_success() {
        Todo todo1 = new Todo();
        todo1.setPublicId(UUID.randomUUID());
        todo1.setTitle("title1");
        todo1.setDescription("description1");
        todo1.setCompleted(false);
        todo1.setPriority(Priority.HIGH);
        todo1.setCreationDate(LocalDateTime.now());

        Todo todo2 = new Todo();
        todo2.setPublicId(UUID.randomUUID());
        todo2.setTitle("title2");
        todo2.setDescription("description2");
        todo2.setCompleted(true);
        todo2.setPriority(Priority.MEDIUM);
        todo2.setCreationDate(LocalDateTime.now());

        Member member = new Member();
        member.setUsername("username");
        member.setPassword("password");
        member.setRoles(Set.of(Role.ROLE_USER));
        member.setCreatedAt(LocalDateTime.now());
        member.addTodo(todo1);

        Member member2 = new Member();
        member2.setUsername("username2");
        member2.setPassword("password2");
        member2.setRoles(Set.of(Role.ROLE_USER));
        member2.setCreatedAt(LocalDateTime.now());
        member2.addTodo(todo2);

        when(todoRepository.findAll()).thenReturn(Arrays.asList(todo1, todo2));
        when(memberRepository.findByUsernameIgnoreCase(anyString())).thenReturn(Optional.of(member), Optional.of(member2));

        List<TodoDTO> result = todoService.getAllTodos();

        assertEquals(2, result.size());
        assertEquals(todo1.getPublicId(), result.get(0).publicId());
        assertEquals(todo2.getPublicId(), result.get(1).publicId());
    }

    @Test
    void getTodo_success() {
        UUID todoId = UUID.randomUUID();
        Todo todo = new Todo();
        todo.setPublicId(todoId);
        todo.setTitle("title");
        todo.setDescription("description");
        todo.setCompleted(false);
        todo.setPriority(Priority.HIGH);
        todo.setCreationDate(LocalDateTime.now());

        Member member = new Member();
        member.setUsername("username");
        member.setPassword("password");
        member.setRoles(Set.of(Role.ROLE_USER));
        member.setCreatedAt(LocalDateTime.now());
        todo.setMember(member);

        when(todoRepository.getByPublicId(todoId)).thenReturn(Optional.of(todo));
        when(memberRepository.findByUsernameIgnoreCase(anyString())).thenReturn(Optional.of(member));

        TodoDTO result = todoService.getTodo(todoId);

        assertNotNull(result);
        assertEquals(todoId, result.publicId());
        assertEquals(todo.getTitle(), result.title());
    }

    @Test
    void getTodo_notFound() {
        UUID todoId = UUID.randomUUID();
        when(todoRepository.getByPublicId(todoId)).thenReturn(Optional.empty());

        NoSuchElementException thrown = assertThrows(
                NoSuchElementException.class,
                () -> todoService.getTodo(todoId)
        );

        assertEquals("Todo not found", thrown.getMessage());
    }

    @Test
    void deleteTodo_success() {
        UUID todoId = UUID.randomUUID();

        todoService.deleteTodo(todoId);

        verify(todoRepository, times(1)).deleteByPublicId(todoId);
    }

    @Test
    void updateTodo_success() {
        UUID todoId = UUID.randomUUID();

        MemberDTO memberDTO = new MemberDTO(
                UUID.randomUUID(),
                "test",
                Set.of(Role.ROLE_USER),
                new ArrayList<>(),
                LocalDateTime.now()
        );

        TodoDTO todoDTO = new TodoDTO(todoId, "title", "description", memberDTO, Priority.HIGH, false, LocalDateTime.now(), TodoContainer.BACKLOG);
        Todo todo = new Todo();
        todo.setPublicId(todoId);
        todo.setTitle("oldTitle");
        todo.setDescription("oldDescription");
        todo.setCompleted(true);
        todo.setPriority(Priority.MEDIUM);
        todo.setCreationDate(LocalDateTime.now());
        Member member = new Member();
        member.setUsername("username");
        member.setPassword("password");
        member.setRoles(Set.of(Role.ROLE_USER));
        member.setCreatedAt(LocalDateTime.now());
        todo.setMember(member);


        when(todoRepository.getByPublicId(todoId)).thenReturn(Optional.of(todo));
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);
        when(memberRepository.findByUsernameIgnoreCase(anyString())).thenReturn(Optional.of(member));

        TodoDTO result = todoService.updateTodo(todoDTO);

        assertNotNull(result);
        assertEquals(todoDTO.title(), result.title());
        assertEquals(todoDTO.description(), result.description());
        assertEquals(todoDTO.priority(), result.priority());
        assertEquals(todoDTO.isCompleted(), result.isCompleted());
    }

    @Test
    void updateTodo_notFound() {
        MemberDTO member = new MemberDTO(
                UUID.randomUUID(),
                "test",
                Set.of(Role.ROLE_USER),
                new ArrayList<>(),
                LocalDateTime.now()
        );
        UUID todoId = UUID.randomUUID();
        TodoDTO todoDTO = new TodoDTO(todoId, "title", "description", member, Priority.HIGH, false, LocalDateTime.now(), TodoContainer.BACKLOG);

        when(todoRepository.getByPublicId(todoId)).thenReturn(Optional.empty());

        NoSuchElementException thrown = assertThrows(
                NoSuchElementException.class,
                () -> todoService.updateTodo(todoDTO)
        );

        assertEquals("Todo not found", thrown.getMessage());
    }
}