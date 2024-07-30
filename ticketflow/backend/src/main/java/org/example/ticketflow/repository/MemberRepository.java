package org.example.ticketflow.repository;

import org.example.ticketflow.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsernameIgnoreCase(String username);
    boolean existsByUsername(String username);
    void deleteByPublicId(UUID publicId);

    Optional<Member> findByPublicId(UUID publicId);
}
