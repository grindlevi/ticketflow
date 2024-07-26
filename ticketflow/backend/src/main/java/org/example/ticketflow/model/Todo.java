package org.example.ticketflow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;
import java.util.UUID;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;
    private UUID publicId = UUID.randomUUID();
    private String title;
    private String description;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Todo todo)) return false;
        return publicId == todo.publicId && Objects.equals(databaseId, todo.databaseId) && Objects.equals(title, todo.title) && Objects.equals(description, todo.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(publicId, databaseId, title, description);
    }

    @Override
    public String toString() {
        return "Todo{" +
                "publicId=" + publicId +
                ", databaseId=" + databaseId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
