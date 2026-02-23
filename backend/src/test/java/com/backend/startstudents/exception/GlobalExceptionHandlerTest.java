package com.backend.startstudents.exception;

import com.backend.startstudents.controller.AlunoController;
import com.backend.startstudents.dto.request.AlunoCreateRequestDTO;
import com.backend.startstudents.service.AlunoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AlunoController.class)
@Import(GlobalExceptionHandler.class)
class GlobalExceptionHandlerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AlunoService alunoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveRetornar400QuandoValidacaoFalhar() throws Exception {

        AlunoCreateRequestDTO request = new AlunoCreateRequestDTO();
        request.setNome("");
        request.setCpf("123");
        request.setEmail("email-invalido");
        request.setTelefone("999");

        mockMvc.perform(post("/api/alunos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("Erro de validação"));
    }

    @Test
    void deveRetornar404QuandoAlunoNaoEncontrado() throws Exception {

        Mockito.when(alunoService.buscarPorId(1L))
                .thenThrow(new AlunoNotFoundException("Aluno não encontrado"));

        mockMvc.perform(get("/api/alunos/1"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Aluno não encontrado"));
    }


    @Test
    void deveRetornar409QuandoEntradaDuplicada() throws Exception {

        Mockito.when(alunoService.criar(any()))
                .thenThrow(new DuplicateEntryException("cpf", "CPF já cadastrado"));

        AlunoCreateRequestDTO request = new AlunoCreateRequestDTO();
        request.setNome("Maria");
        request.setCpf("123.456.789-00");
        request.setEmail("maria@email.com");
        request.setTelefone("(11) 99999-9999");

        mockMvc.perform(post("/api/alunos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.message").value("Erro de duplicidade"));
    }

    @Test
    void deveRetornar500ParaErroGenerico() throws Exception {

        Mockito.when(alunoService.criar(any()))
                .thenThrow(new RuntimeException("Erro inesperado"));

        AlunoCreateRequestDTO request = new AlunoCreateRequestDTO();
        request.setNome("Maria");
        request.setCpf("123.456.789-00");
        request.setEmail("maria@email.com");
        request.setTelefone("(11) 99999-9999");

        mockMvc.perform(post("/api/alunos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.message").value("Erro interno do servidor"));
    }
}