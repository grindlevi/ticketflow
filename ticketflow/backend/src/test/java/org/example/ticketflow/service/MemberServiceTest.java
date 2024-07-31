package org.example.ticketflow.service;

import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewMemberDTO;
import org.example.ticketflow.model.JwtResponse;
import org.example.ticketflow.model.Member;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class MemberServiceTest {
    @InjectMocks
    private MemberService memberService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private AuthenticationManager authenticationManager;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerMember_success() {
        NewMemberDTO newMemberDTO = new NewMemberDTO("username", "password");

        when(memberRepository.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        memberService.registerMember(newMemberDTO);

        verify(memberRepository, times(1)).save(any(Member.class));
    }

    @Test
    void registerMember_usernameAlreadyExists() {
        NewMemberDTO newMemberDTO = new NewMemberDTO("username", "password");

        when(memberRepository.existsByUsername(anyString())).thenReturn(true);

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                () -> memberService.registerMember(newMemberDTO)
        );

        assertEquals("Username or Email already exists", thrown.getMessage());
    }

    @Test
    void authenticate_success() {
        NewMemberDTO loginRequest = new NewMemberDTO("username", "password");
        Authentication authentication = mock(Authentication.class);
        User userDetails = new User("username", "password",
                Collections.singletonList(() -> "ROLE_USER"));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("jwtToken");

        JwtResponse response = memberService.authenticate(loginRequest);
        System.out.println(response);

        assertEquals("jwtToken", response.jwt());
        assertEquals("username", response.username());
        assertTrue(response.roles().contains("ROLE_USER"));
    }

    @Test
    void getAllMembers_success() {
        Member member = new Member();
        member.setPublicId(UUID.randomUUID());
        member.setUsername("username");
        member.setPassword("password");

        Member member2 = new Member();
        member2.setPublicId(UUID.randomUUID());
        member2.setUsername("username2");
        member2.setPassword("password2");

        List<Member> members = Arrays.asList(
                member,
                member2
        );

        when(memberRepository.findAll()).thenReturn(members);

        Set<MemberDTO> memberDTOS = memberService.getAllMembers();

        assertEquals(members.size(), memberDTOS.size());
    }

    @Test
    void getMember_success() {
        UUID publicId = UUID.randomUUID();
        Member member = new Member();
        member.setPublicId(publicId);
        member.setUsername("username");
        when(memberRepository.findByPublicId(publicId)).thenReturn(Optional.of(member));

        MemberDTO memberDTO = memberService.getMember(publicId);

        assertEquals(publicId, memberDTO.publicId());
        assertEquals("username", memberDTO.username());
    }

    @Test
    void getMember_notFound() {
        UUID publicId = UUID.randomUUID();
        when(memberRepository.findByPublicId(publicId)).thenReturn(Optional.empty());

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                () -> memberService.getMember(publicId)
        );

        assertEquals("Member not found", thrown.getMessage());
    }
}