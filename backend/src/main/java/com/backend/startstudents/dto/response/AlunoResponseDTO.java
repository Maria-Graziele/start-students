package com.backend.startstudents.dto.response;

import com.backend.startstudents.model.Aluno;
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
    private String foto;

    public static AlunoResponseDTO fromEntity(Aluno aluno) {
        AlunoResponseDTO dto = new AlunoResponseDTO();
                dto.setId(aluno.getId());
                dto.setNome(aluno.getNome());
                dto.setStatus(aluno.getStatus());
                dto.setCpf(aluno.getCpf());
                dto.setEmail(aluno.getEmail());
                dto.setTelefone(aluno.getTelefone());
                dto.setMatricula(aluno.getMatricula());
                dto.setAtivo(aluno.getAtivo());
                dto.setFoto(aluno.getFoto());
                return dto;
    }
}