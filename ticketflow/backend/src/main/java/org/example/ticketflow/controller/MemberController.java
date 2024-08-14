package org.example.ticketflow.controller;

import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewMemberDTO;
import org.example.ticketflow.model.JwtResponse;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.service.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
public class MemberController {
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public MemberController(MemberService memberService, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @PostMapping("/auth/register")
    public void register(@RequestBody NewMemberDTO newMemberDTO) {
        memberService.registerMember(newMemberDTO);
    }

    @PostMapping("/auth/login")
    public JwtResponse authenticateMember(@RequestBody NewMemberDTO loginRequest) {
        return memberService.authenticate(loginRequest);
    }

    @DeleteMapping("/admin/member/{publicId}")
    public void deleteMember(@PathVariable UUID publicId) {
        memberRepository.deleteByPublicId(publicId);
    }

    @GetMapping("/admin/member")
    public Set<MemberDTO> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/admin/member/{publicId}")
    public MemberDTO getMember(@PathVariable UUID publicId) {
        return memberService.getMember(publicId);
    }
}


