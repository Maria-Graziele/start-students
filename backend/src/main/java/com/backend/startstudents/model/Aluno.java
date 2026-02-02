package com.backend.startstudents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Indica que esta classe representa uma entidade JPA - Java Persistence API.  Define como mapear objetos Java para tabelas de banco de dados usando OMR.
@Table(name = "alunos")
@Data // Lombok: gera automaticamente getters, setters, toString, equals e hashCode
@NoArgsConstructor // Lombok: gera construtor sem argumentos
@AllArgsConstructor // Lombok: gera construtor com todos os campos
public class Aluno {

    @Id // Indica a chave primária da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto incremento no banco
    private Long id;

    @Column(nullable = false) // Campo obrigatório (NOT NULL no banco)
    private String nome;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String matricula;

    @Column(nullable = false)
    private Boolean ativo;

// Boolean também vira NOT NULL, exigindo true/false
}