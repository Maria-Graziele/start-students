package com.backend.startstudents.controller;

import com.backend.startstudents.dto.request.AlunoCreateRequestDTO;
import com.backend.startstudents.dto.request.AlunoUpdateRequestDTO;
import com.backend.startstudents.dto.response.AlunoResponseDTO;
import com.backend.startstudents.service.AlunoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public Page<AlunoResponseDTO> listar(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Boolean ativo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return alunoService.listar(search, status, ativo, page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> buscarPorId(@PathVariable Long id) {
        AlunoResponseDTO aluno = alunoService.buscarPorId(id);
        return ResponseEntity.ok(aluno);
    }
    @PostMapping
    public ResponseEntity<AlunoResponseDTO> criar(
            @Valid @RequestBody AlunoCreateRequestDTO dto) {

        AlunoResponseDTO alunoCriado = alunoService.criar(dto);
        URI location = URI.create("/api/alunos/" + alunoCriado.getId());
        return ResponseEntity.created(location).body(alunoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody AlunoUpdateRequestDTO dto) {

        AlunoResponseDTO alunoAtualizado = alunoService.atualizar(id, dto);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}