package com.backend.startstudents.dto;

import com.backend.startstudents.validator.NomeCompleto;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.processing.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoRequestDTO {

    @NotNull(message = "O nome é obrigatório")
    @NomeCompleto(message = "Nome inválido: não pode conter apenas espaços, caracteres invisíveis ou estar vazio")
    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres")
    private String nome;

    @NotBlank(message = "O status é obrigatório")
    @Pattern(regexp = "Ativo | Inativo",
            message = "Status deve ser: Ativo ou Inativo")
    private String status;

    @NotBlank(message = "O CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}--\\d{2}",
            message = "CPF deve ser no formato: 000.000.000-00")
    private String cpf;

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "Email inválido")
    @Size(max = 50, message = "O email deve ter no máximo 50 caracteres")
    private String email;

    @NotBlank(message = "O telefone é obrigatório")
    @Pattern((regexp = "\\(\\d{2}\\) \\d{4,5}--\\d{4}",
            message = "Telefone deve estar no formato: (00) 00000-0000 ou (00) 0000-0000")
    private String telefone;

    @NotBlank(message = "A matrícula é obrigatória")
    @Size(min = 5, max = 20, message = "A matrícula deve ter entre 5 e 20 caracteres")
    private String matricula;

    @NotNull(message = "O campo 'ativo" é obrigatório)
    private Boolean ativo;
}
