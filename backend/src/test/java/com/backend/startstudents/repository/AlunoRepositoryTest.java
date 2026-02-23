package com.backend.startstudents.repository;

import com.backend.startstudents.model.Aluno;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class AlunoRepositoryTest {

    @Autowired
    private AlunoRepository repository;

    private Aluno criarAlunoBase() {
        Aluno aluno = new Aluno();
        aluno.setNome("Maria");
        aluno.setCpf("123.456.789-00");
        aluno.setEmail("maria@email.com");
        aluno.setTelefone("(11) 99999-9999");
        aluno.setStatus("Ativo");
        aluno.setMatricula("MAT001");
        aluno.setAtivo(true);
        aluno.setFoto(null);
        return aluno;
    }

    @Test
    @DisplayName("Deve retornar true quando CPF já existe")
    void deveRetornarTrueQuandoCpfExiste() {

        Aluno aluno = repository.save(criarAlunoBase());

        boolean exists = repository.existsByCpf(aluno.getCpf());

        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("Deve retornar true quando email já existe")
    void deveRetornarTrueQuandoEmailExiste() {

        Aluno aluno = repository.save(criarAlunoBase());

        boolean exists = repository.existsByEmail(aluno.getEmail());

        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("Deve retornar true quando matrícula já existe")
    void deveRetornarTrueQuandoMatriculaExiste() {

        Aluno aluno = repository.save(criarAlunoBase());

        boolean exists = repository.existsByMatricula(aluno.getMatricula());

        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("Deve retornar false quando CPF pertence ao próprio ID")
    void naoDeveConsiderarMesmoIdNoExistsCpfAndIdNot() {

        Aluno aluno = repository.save(criarAlunoBase());

        boolean exists = repository.existsByCpfAndIdNot(
                aluno.getCpf(),
                aluno.getId()
        );

        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("Deve buscar alunos por status")
    void deveBuscarPorStatus() {

        repository.save(criarAlunoBase());

        Page<Aluno> page = repository.findByStatus(
                "Ativo",
                PageRequest.of(0, 10)
        );

        assertThat(page.getContent()).hasSize(1);
    }

    @Test
    @DisplayName("Deve buscar alunos por campo ativo")
    void deveBuscarPorAtivo() {

        repository.save(criarAlunoBase());

        Page<Aluno> page = repository.findByAtivo(
                true,
                PageRequest.of(0, 10)
        );

        assertThat(page.getContent()).hasSize(1);
    }

    // query personalizada
    @Test
    @DisplayName("Deve buscar aluno usando filtros combinados")
    void deveBuscarPorFiltros() {

        repository.save(criarAlunoBase());

        Page<Aluno> page = repository.findByFilters(
                "Maria",
                "Ativo",
                true,
                PageRequest.of(0, 10)
        );

        assertThat(page.getContent()).hasSize(1);
        assertThat(page.getContent().get(0).getNome()).isEqualTo("Maria");
    }
}