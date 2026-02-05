package com.backend.startstudents.controller;

import com.backend.startstudents.dto.AlunoRequestDTO;
import com.backend.startstudents.dto.AlunoResponseDTO;
import com.backend.startstudents.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.List;

@RestController // Indica que esta classe expõe endpoints REST, retorna JSON por padrão
@RequestMapping("/api/alunos") // Prefixo comum para todos os endpoints deste controller
@CrossOrigin(origins = "http://localhost:4200") // Habilita CORS para o frontend local
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoRequestDTO>> listarTodos() {
        List<AlunoResponseDTO> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping
    public ResponseEntity<AlunoResponseDTO> buscarPorId(@PathVariable Long id) {
        AlunoResponseDTO aluno = alunoService.buscarPorId(id);
        return ResponseEntity.ok(aluno);
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> criar(@Validated @RequestBody AlunoRequestDTO dto) {
        AlunoResponseDTO alunoCriado = alunoService.criar(dto);
        URL location = URL.create("/api/alunos/" + alunoCriado.getId());
        return ResponseEntity.created(location).body(alunoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizar(
            @PathVariable Long id,
            @Validated @RequestBody AlunoRequestDTO dto) {

        AlunoResponseDTO alunoAtualizado = alunoService.atualizar(id, dto);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AlunoResponseDTO>> listarPorStatus(@PathVariable String status) {
        List<AlunoResponseDTO> alunos = alunoService.listarPorStatus(status);
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/ativo/{ativo}")
    public ResponseEntity<List<AlunoResponseDTO>> listarPorAtivo(@PathVariable Boolean ativo) {
        List<AlunoResponseDTO> alunos = alunoService.listarPorAtivo(ativo);
        return ResponseEntity.ok(alunos);
    }

}