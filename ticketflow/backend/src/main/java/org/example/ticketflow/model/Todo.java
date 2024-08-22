package org.example.ticketflow.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;
    @Column(unique = true, nullable = false)
    private UUID publicId = UUID.randomUUID();
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private boolean isCompleted;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    public TodoContainer getTodoContainer() {
        return todoContainer;
    }

    public void setTodoContainer(TodoContainer todoContainer) {
        this.todoContainer = todoContainer;
    }

    // Tracks the corresponding container div on frontend
    private TodoContainer todoContainer;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Todo todo)) return false;
        return isCompleted == todo.isCompleted && Objects.equals(databaseId, todo.databaseId) && Objects.equals(publicId, todo.publicId) && Objects.equals(title, todo.title) && Objects.equals(description, todo.description) && Objects.equals(creationDate, todo.creationDate) && priority == todo.priority && Objects.equals(member, todo.member) && todoContainer == todo.todoContainer;
    }

    @Override
    public int hashCode() {
        return Objects.hash(databaseId, publicId, title, description, creationDate, isCompleted, priority, member, todoContainer);
    }

    @Override
    public String toString() {
        return "Todo{" +
                "databaseId=" + databaseId +
                ", publicId=" + publicId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", creationDate=" + creationDate +
                ", isCompleted=" + isCompleted +
                ", priority=" + priority +
                ", member=" + member +
                ", todoContainer=" + todoContainer +
                '}';
    }
}
