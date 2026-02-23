package com.backend.startstudents.controller;

import com.backend.startstudents.dto.request.AlunoCreateRequestDTO;
import com.backend.startstudents.dto.request.AlunoUpdateRequestDTO;
import com.backend.startstudents.dto.response.AlunoResponseDTO;
import com.backend.startstudents.service.AlunoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AlunoController.class)
class AlunoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AlunoService alunoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveListarAlunos() throws Exception {

        AlunoResponseDTO aluno = new AlunoResponseDTO();
        aluno.setId(1L);
        aluno.setNome("Maria");
        aluno.setStatus("Ativo");
        aluno.setCpf("123.456.789-00");
        aluno.setEmail("maria@email.com");
        aluno.setTelefone("(11) 99999-9999");
        aluno.setMatricula("MAT001");
        aluno.setAtivo(true);
        aluno.setFoto(null);

        Mockito.when(alunoService.listar(null, null, null, 0, 10))
                .thenReturn(new PageImpl<>(List.of(aluno)));

        mockMvc.perform(get("/api/alunos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].nome").value("Maria"));
    }

    @Test
    void deveBuscarAlunoPorId() throws Exception {

        AlunoResponseDTO aluno = new AlunoResponseDTO();
        aluno.setId(1L);
        aluno.setNome("Maria");

        Mockito.when(alunoService.buscarPorId(1L)).thenReturn(aluno);

        mockMvc.perform(get("/api/alunos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Maria"));
    }

    @Test
    void deveCriarAluno() throws Exception {

        AlunoCreateRequestDTO request = new AlunoCreateRequestDTO();
        request.setNome("Maria");
        request.setCpf("123.456.789-00");
        request.setEmail("maria@email.com");
        request.setTelefone("(11) 99999-9999");
        request.setFoto(null);

        AlunoResponseDTO response = new AlunoResponseDTO();
        response.setId(1L);
        response.setNome("Maria");

        Mockito.when(alunoService.criar(Mockito.any())).thenReturn(response);

        mockMvc.perform(post("/api/alunos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.nome").value("Maria"));
    }

    @Test
    void deveAtualizarAluno() throws Exception {

        AlunoUpdateRequestDTO request = new AlunoUpdateRequestDTO();
        request.setNome("Maria Atualizada");
        request.setEmail("maria@email.com");
        request.setTelefone("(11) 99999-9999");
        request.setStatus("Ativo");
        request.setAtivo(true);
        request.setFoto(null);

        AlunoResponseDTO response = new AlunoResponseDTO();
        response.setId(1L);
        response.setNome("Maria Atualizada");

        Mockito.when(alunoService.atualizar(Mockito.eq(1L), Mockito.any()))
                .thenReturn(response);

        mockMvc.perform(put("/api/alunos/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Maria Atualizada"));
    }

    @Test
    void deveDeletarAluno() throws Exception {

        mockMvc.perform(delete("/api/alunos/1"))
                .andExpect(status().isNoContent());
    }
}