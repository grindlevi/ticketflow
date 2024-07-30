package org.example.ticketflow;

import org.example.ticketflow.model.Member;
import org.example.ticketflow.model.Role;
import org.example.ticketflow.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Set;

@Component
public class AdminInit implements CommandLineRunner {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String defaultAdminUsername = "admin";
        if (!memberRepository.existsByUsername(defaultAdminUsername)) {
            Member admin = new Member();
            admin.setUsername(defaultAdminUsername);
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRoles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER));
            admin.setCreatedAt(LocalDateTime.now());
            memberRepository.save(admin);
        }
    }
}
