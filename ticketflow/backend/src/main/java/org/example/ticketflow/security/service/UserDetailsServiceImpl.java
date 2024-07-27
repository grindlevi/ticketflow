package org.example.ticketflow.security.service;

import org.example.ticketflow.model.Member;
import org.example.ticketflow.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Autowired
    public UserDetailsServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByUsernameIgnoreCase(username).orElseThrow(() -> new UsernameNotFoundException(username));

        List<SimpleGrantedAuthority> roles =
                member.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.name())).toList();

        return new User(member.getUsername(), member.getPassword(), roles);
    }
}

