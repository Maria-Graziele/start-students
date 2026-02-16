package com.backend.startstudents.repository;

import com.backend.startstudents.model.Aluno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    // Verifica se CPF já existe (para validação de duplicidade)
    boolean existsByCpf(String cpf);

    // Verifica se CPF já existe, excluindo um ID específico (para update)
    boolean existsByCpfAndIdNot(String cpf, Long id);

    // Verifica se email já existe
    boolean existsByEmail(String email);

    // Verifica se email já existe, excluindo um ID específico
    boolean existsByEmailAndIdNot(String email, Long id);

    // Verifica se matrícula já existe
    boolean existsByMatricula(String matricula);

    // Verifica se matrícula já existe, excluindo um ID específico
    boolean existsByMatriculaAndIdNot(String matricula, Long id);

    // Busca alunos por status com paginação
    Page<Aluno> findByStatus(String status, Pageable pageable);

    // Busca alunos por ativo com paginação
    Page<Aluno> findByAtivo(Boolean ativo, Pageable pageable);

    @Query("""
SELECT a FROM Aluno a
WHERE (
    :search IS NULL OR :search = '' OR
    LOWER(a.nome) LIKE CONCAT('%', LOWER(:search), '%') OR
    LOWER(a.matricula) LIKE CONCAT('%', LOWER(:search), '%')
)
AND (:status IS NULL OR :status = '' OR a.status = :status)
AND (:ativo IS NULL OR a.ativo = :ativo)
""")
    Page<Aluno> findByFilters(
            @Param("search") String search,
            @Param("status") String status,
            @Param("ativo") Boolean ativo,
            Pageable pageable);
}