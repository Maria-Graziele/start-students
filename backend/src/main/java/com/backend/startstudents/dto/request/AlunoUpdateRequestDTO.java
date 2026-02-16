package com.backend.startstudents.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoUpdateRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(
            regexp = "\\(\\d{2}\\) \\d{5}-\\d{4}",
            message = "Telefone deve estar no formato (00) 00000-0000"
    )
    private String telefone;

    @NotBlank(message = "Status é obrigatório")
    @Pattern(regexp = "Ativo|Inativo")
    private String status;

    @NotNull(message = "Campo ativo é obrigatório")
    private Boolean ativo;

    private String foto;
}
