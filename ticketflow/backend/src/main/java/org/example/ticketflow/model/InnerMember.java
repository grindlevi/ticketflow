package org.example.ticketflow.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;
    private UUID publicId = UUID.randomUUID();
    private String username;
    private String password;

    public Long getDatabaseId() {
        return databaseId;
    }

    public String getPassword() {
        return password;
    }

    public UUID getPublicId() {
        return publicId;
    }

    public String getUsername() {
        return username;
    }

    public void setDatabaseId(Long databaseId) {
        this.databaseId = databaseId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPublicId(UUID publicId) {
        this.publicId = publicId;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
}
