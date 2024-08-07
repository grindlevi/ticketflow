package org.example.ticketflow.model;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;


@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;
    @Column(nullable = false)
    private UUID publicId = UUID.randomUUID();
    @Column(unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "role", joinColumns = @JoinColumn(name = "member_id"))
    private Set<Role> roles;
    @OneToMany(mappedBy = "member")
    @JsonManagedReference
    private List<Todo> todos = new ArrayList<>();
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(Long databaseId) {
        this.databaseId = databaseId;
    }

    public UUID getPublicId() {
        return publicId;
    }

    public void setPublicId(UUID publicId) {
        this.publicId = publicId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Member member)) return false;
        return Objects.equals(databaseId, member.databaseId) && Objects.equals(publicId, member.publicId) && Objects.equals(username, member.username) && Objects.equals(password, member.password) && Objects.equals(todos, member.todos) && Objects.equals(createdAt, member.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(databaseId, publicId, username, password, todos, createdAt);
    }

    @Override
    public String toString() {
        return "Member{" +
                "databaseId=" + databaseId +
                ", publicId=" + publicId +
                ", username='" + username + '\'' +
                ", todos=" + todos +
                ", createdAt=" + createdAt +
                '}';
    }

    public void addTodo(Todo newTodo) {
        this.todos.add(newTodo);
        newTodo.setMember(this);
    }
}