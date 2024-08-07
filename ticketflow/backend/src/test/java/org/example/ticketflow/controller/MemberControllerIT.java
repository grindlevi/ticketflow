package org.example.ticketflow.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.ticketflow.model.DTO.MemberDTO;
import org.example.ticketflow.model.DTO.NewMemberDTO;
import org.example.ticketflow.model.Member;
import org.example.ticketflow.repository.MemberRepository;
import org.example.ticketflow.security.jwt.JwtUtils;
import org.example.ticketflow.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class MemberControllerIT {

    @MockBean
    private JwtUtils jwtUtils;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;

    @BeforeEach
    public void setUp() {
        memberRepository.deleteAll();
    }

    @Test
    public void testRegisterMember() throws Exception {
        NewMemberDTO request = new NewMemberDTO("user", "user");

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void testAuthenticateMember() throws Exception {
        NewMemberDTO newMemberDTO = new NewMemberDTO("test", "test");
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newMemberDTO)))
                        .andExpect(status().isOk());

        Optional<Member> testMember = memberRepository.findByUsernameIgnoreCase(newMemberDTO.username());
        assertTrue(testMember.isPresent());

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"test\", \"password\":\"test\"}"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.roles").exists());
    }

    @Test
    @Transactional
    @WithMockUser(username = "adminAuth", roles = "ADMIN")
    public void testDeleteMember() throws Exception {
        NewMemberDTO newMemberDTO = new NewMemberDTO("username", "password");
        memberService.registerMember(newMemberDTO);

        Optional<Member> testMember = memberRepository.findByUsernameIgnoreCase(newMemberDTO.username());
        UUID publicId = null;
        if (testMember.isPresent()) {
            publicId = testMember.get().getPublicId();
        }

        mockMvc.perform(MockMvcRequestBuilders.delete("/member/" + publicId))
                .andExpect(status().isOk());

        assertThat(memberRepository.findByPublicId(publicId).isPresent(), is(false));
    }

    @Test
    @WithMockUser(username = "adminAuth", roles = "ADMIN")
    public void testGetAllMembers() throws Exception {
        NewMemberDTO newMemberDTO1 = new NewMemberDTO("username1", "password1");
        NewMemberDTO newMemberDTO2 = new NewMemberDTO("username2", "password2");
        memberService.registerMember(newMemberDTO1);
        memberService.registerMember(newMemberDTO2);

        mockMvc.perform(MockMvcRequestBuilders.get("/member"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", is(2)));
    }

    @Test
    @WithMockUser(username = "adminAuth", roles = "ADMIN")
    public void testGetMember() throws Exception {
        NewMemberDTO newMemberDTO = new NewMemberDTO("username", "password");
        memberService.registerMember(newMemberDTO);
        UUID publicId = memberRepository.findByUsernameIgnoreCase("username").get().getPublicId();

        mockMvc.perform(MockMvcRequestBuilders.get("/member/" + publicId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("username")));
    }
}