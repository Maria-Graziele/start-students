package com.backend.startstudents.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AlunoResponseDTO {

    private Long id;
    private String nome;
    private String status;
    private String cpf;
    private String email;
    private String telefone;
    private String matricula;
    private Boolean ativo;

    public static AlunoResponseDTO fromEntity(Aluno aluno) {
        return new AlunoResponseDTO(
                aluno.getId(),
                aluno.getNome(),
                aluno.getStatus(),
                aluno.getCpf(),
                aluno.getEmail(),
                aluno.getTelefone(),
                aluno.getMatricula(),
                aluno.getAtivo()
        );
    }
}
