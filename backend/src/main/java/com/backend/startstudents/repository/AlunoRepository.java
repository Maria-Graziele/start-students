package com.backend.startstudents.repository;

import com.backend.startstudents.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Indica que esta interface é um componente de acesso ao banco
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

/** JpaRepository<Aluno, Long> já traz vários métodos prontos como:
save(), findById(), findAll(), deleteById(), existsById()*/


    List<Aluno> findByAtivo(Boolean ativo); // Busca todos os alunos filtrando pelo campo "ativo"

    List<Aluno> findByStatus(String status);  // Busca alunos filtrando pelo campo "status"
}