package com.backend.startstudents.controller;

import com.backend.startstudents.model.Aluno;
import com.backend.startstudents.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController // Indica que esta classe expõe endpoints REST, retorna JSON por padrão
@RequestMapping("/api/alunos") // Prefixo comum para todos os endpoints deste controller
@CrossOrigin(origins = "http://localhost:4200") // Habilita CORS para o frontend local
public class AlunoController {

    @Autowired // Injeta a dependência do repositório
    private AlunoRepository alunoRepository;;

    // GET - Listar todos os alunos
    @GetMapping
    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    } // Retorna todos os alunos do banco

    // GET - Buscar aluno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        // Busca pelo ID e retorna 200 OK com o aluno se existir, senão 404 Not Found
        return alunoRepository.findById(id)
                .map(ResponseEntity::ok) // constrói 200 OK com o body
                .orElse(ResponseEntity.notFound().build()); // 404 Not Found sem body
    }

    // POST - Criar novo aluno
    @PostMapping
    public ResponseEntity<Aluno> criar(@RequestBody Aluno aluno) {
        // Persiste o aluno recebido no corpo da requisição
        Aluno salvo = alunoRepository.save(aluno);
        return ResponseEntity
                .created(URI.create("/api/alunos/" + salvo.getId()))
                .body(salvo);
    }

    // PUT - Atualizar aluno
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno alunoAtualizado) {
        // Busca o aluno existente; se existir, atualiza campos e salva; se não, retorna 404
        return alunoRepository.findById(id)
                .map(aluno -> { //Atualiza campos permitidos
                    aluno.setNome(alunoAtualizado.getNome());
                    aluno.setStatus(alunoAtualizado.getStatus());
                    aluno.setCpf(alunoAtualizado.getCpf());
                    aluno.setEmail(alunoAtualizado.getEmail());
                    aluno.setTelefone(alunoAtualizado.getTelefone());
                    aluno.setMatricula(alunoAtualizado.getMatricula());
                    aluno.setAtivo(alunoAtualizado.getAtivo());
                    Aluno salvo = alunoRepository.save(aluno);
                    return ResponseEntity.ok(salvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE - Deletar aluno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        // Verifica se existe antes de tentar deletar para retornar o status correto
        if (alunoRepository.existsById(id)) {
            alunoRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content deleção bem-sucedida
        }
        return ResponseEntity.notFound().build(); // 404 se não encontrou o recurso
    }
}
