package com.backend.startstudents.service;

import com.backend.startstudents.dto.request.AlunoCreateRequestDTO;
import com.backend.startstudents.dto.request.AlunoUpdateRequestDTO;
import com.backend.startstudents.dto.response.AlunoResponseDTO;
import com.backend.startstudents.exception.AlunoNotFoundException;
import com.backend.startstudents.exception.DuplicateEntryException;
import com.backend.startstudents.model.Aluno;
import com.backend.startstudents.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Transactional(readOnly = true)
    public Page<AlunoResponseDTO> listar(String search, String status, Boolean ativo, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("nome").ascending());

        Page<Aluno> alunosPage = alunoRepository.findByFilters(
                search, status, ativo, pageable
        );

        return alunosPage.map(this::convertToResponseDTO);
    }
    @Transactional
    public void deletar(Long id) {

        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new AlunoNotFoundException("Aluno não encontrado"));

        alunoRepository.delete(aluno);
    }

    @Transactional(readOnly = true)
    public AlunoResponseDTO buscarPorId(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new AlunoNotFoundException("Aluno não encontrado"));
        return convertToResponseDTO(aluno);
    }
    @Transactional
    public AlunoResponseDTO criar(AlunoCreateRequestDTO dto) throws DuplicateEntryException {

        // valida duplicidade
        if (alunoRepository.existsByCpf(dto.getCpf())) {
            throw new DuplicateEntryException("cpf", dto.getCpf());
        }
        if (alunoRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateEntryException("email", dto.getEmail());
        }

        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome().trim());
        aluno.setCpf(dto.getCpf());
        aluno.setEmail(dto.getEmail());
        aluno.setTelefone(dto.getTelefone());
        aluno.setFoto(dto.getFoto());

        // valores automáticos
        aluno.setStatus("Ativo");
        aluno.setAtivo(true);
        aluno.setMatricula(gerarMatricula());

        Aluno salvo = alunoRepository.save(aluno);
        return convertToResponseDTO(salvo);
    }

    @Transactional
    public AlunoResponseDTO atualizar(Long id, AlunoUpdateRequestDTO dto) {

        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new AlunoNotFoundException("Aluno não encontrado"));

        aluno.setNome(dto.getNome().trim());
        aluno.setEmail(dto.getEmail());
        aluno.setTelefone(dto.getTelefone());
        aluno.setStatus(dto.getStatus());
        aluno.setAtivo(dto.getAtivo());

        if (dto.getFoto() != null) {
            aluno.setFoto(dto.getFoto());
        }

        Aluno atualizado = alunoRepository.save(aluno);
        return convertToResponseDTO(atualizado);
    }

    private String gerarMatricula() {
        return "MAT" + System.currentTimeMillis();
    }

    private AlunoResponseDTO convertToResponseDTO(Aluno aluno) {
        AlunoResponseDTO dto = new AlunoResponseDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setCpf(aluno.getCpf());
        dto.setEmail(aluno.getEmail());
        dto.setTelefone(aluno.getTelefone());
        dto.setMatricula(aluno.getMatricula());
        dto.setStatus(aluno.getStatus());
        dto.setAtivo(aluno.getAtivo());
        dto.setFoto(aluno.getFoto());
        return dto;
    }
}