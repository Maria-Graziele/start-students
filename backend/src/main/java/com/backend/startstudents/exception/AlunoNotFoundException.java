package com.backend.startstudents.exception;

public class AlunoNotFoundException extends RuntimeException {
    public AlunoNotFoundException(String message) {
        super(message);
    }

    public AlunoNotFoundException(Long id) {
        super("Aluno com ID " + id + " não encontrado");
    }
}