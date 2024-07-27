package org.example.ticketflow.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.*;


@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;
    private UUID publicId = UUID.randomUUID();
    private String username;
    private String password;
    @OneToMany
    @JoinColumn(name = "todoId")
    private List<Todo> todos;
    private LocalDateTime createdAt;


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
                ", password='" + password + '\'' +
                ", todos=" + todos +
                ", createdAt=" + createdAt +
                '}';
    }
}