package org.example.ticketflow.repository;

import org.example.ticketflow.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsernameIgnoreCase(String username);
}
