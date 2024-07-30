package org.example.ticketflow.service;

import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewMemberDTO;
import org.example.ticketflow.model.JwtResponse;
import org.example.ticketflow.model.Member;
import org.example.ticketflow.model.Role;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.security.jwt.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public void registerMember(NewMemberDTO newMemberDTO) {
        if (memberRepository.existsByUsername(newMemberDTO.username())) {
            throw new IllegalArgumentException("Username or Email already exists");
        }

        Member member = new Member();
        member.setUsername(newMemberDTO.username());
        member.setPassword(passwordEncoder.encode(newMemberDTO.password()));
        member.setRoles(Set.of(Role.ROLE_USER));
        member.setTodos(new ArrayList<>());
        member.setCreatedAt(LocalDateTime.now());

        memberRepository.save(member);
    }

    public JwtResponse authenticate(NewMemberDTO loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .toList();
        return new JwtResponse(jwt, userDetails.getUsername(), roles);
    }

    public Set<MemberDTO> getAllMembers() {
        Set<MemberDTO> memberDTOS = new HashSet<>();
        List<Member> members = memberRepository.findAll();

        for (Member member : members) {
            memberDTOS.add(
                    new MemberDTO(
                            member.getPublicId(),
                            member.getUsername(),
                            member.getRoles(),
                            member.getTodos(),
                            member.getCreatedAt()
                    )
            );
        }
        return memberDTOS;
    }


    public MemberDTO getMember(UUID publicId) {
        Optional<Member> member = memberRepository.findByPublicId(publicId);
        if (member.isPresent()) {
            return new MemberDTO(
                    member.get().getPublicId(),
                    member.get().getUsername(),
                    member.get().getRoles(),
                    member.get().getTodos(),
                    member.get().getCreatedAt()
            );
        }
        throw new IllegalArgumentException("Member not found");
    }
}
