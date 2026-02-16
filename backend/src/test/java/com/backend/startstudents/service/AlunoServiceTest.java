package com.backend.startstudents.service;

import com.backend.startstudents.dto.request.AlunoCreateRequestDTO;
import com.backend.startstudents.dto.response.AlunoResponseDTO;
import com.backend.startstudents.exception.DuplicateEntryException;
import com.backend.startstudents.model.Aluno;
import com.backend.startstudents.repository.AlunoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AlunoServiceTest {

    @Mock
    private AlunoRepository alunoRepository;

    @InjectMocks
    private AlunoService alunoService;

    private AlunoCreateRequestDTO dto;

    @BeforeEach
    void setUp() {

        dto = new AlunoCreateRequestDTO();
        dto.setNome("Maria Silva");
        dto.setCpf("123.456.789-00"); // formato correto
        dto.setEmail("maria@email.com");
        dto.setTelefone("(11) 99999-9999");
        dto.setFoto(null);
    }

    @Test
    void deveCriarAlunoComSucesso() {

        when(alunoRepository.existsByCpf(dto.getCpf())).thenReturn(false);
        when(alunoRepository.existsByEmail(dto.getEmail())).thenReturn(false);

        Aluno alunoSalvo = new Aluno();
        alunoSalvo.setId(1L);
        alunoSalvo.setNome(dto.getNome());
        alunoSalvo.setCpf(dto.getCpf());
        alunoSalvo.setEmail(dto.getEmail());
        alunoSalvo.setTelefone(dto.getTelefone());
        alunoSalvo.setMatricula("MAT123456");
        alunoSalvo.setStatus("Ativo");
        alunoSalvo.setAtivo(true);

        when(alunoRepository.save(any(Aluno.class))).thenReturn(alunoSalvo);

        AlunoResponseDTO response = alunoService.criar(dto);

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getNome()).isEqualTo("Maria Silva");
        assertThat(response.getStatus()).isEqualTo("Ativo");

        verify(alunoRepository, times(1)).save(any(Aluno.class));
    }

    @Test
    void deveLancarErroSeCpfJaExistir() {

        when(alunoRepository.existsByCpf(dto.getCpf())).thenReturn(true);

        assertThatThrownBy(() -> alunoService.criar(dto))
                .isInstanceOf(DuplicateEntryException.class)
                .hasMessageContaining("CPF");

        verify(alunoRepository, never()).save(any());
    }
}