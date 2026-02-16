package com.backend.startstudents.service.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NomeCompletoValidator implements ConstraintValidator<NomeCompleto, String> {

    @Override
    public void initialize(NomeCompleto constraintAnnotation) {
        // Inicialização se necessário
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }

        // Remove caracteres invisíveis e normaliza espaços
        String valorLimpo = value
                .replaceAll("[\\u200B-\\u200D\\uFEFF\\u3164]", "")
                .replaceAll("\\s+", " ")
                .trim();

        // Verifica se após limpar ainda tem conteúdo
        if (valorLimpo.isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Nome não pode estar vazio")
                    .addConstraintViolation();
            return false;
        }

        // Valida se contém apenas letras, espaços e acentos
        if (!valorLimpo.matches("^[a-zA-ZÀ-ÿ\\s]+$")) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Nome não pode conter números ou caracteres especiais")
                    .addConstraintViolation();
            return false;
        }

        // Divide em palavras
        String[] palavras = valorLimpo.split("\\s+");

        // Valida se tem pelo menos 2 palavras (nome + sobrenome)
        if (palavras.length < 2) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Nome completo deve conter nome e sobrenome")
                    .addConstraintViolation();
            return false;
        }

        // Valida se cada palavra tem pelo menos 2 caracteres
        for (String palavra : palavras) {
            if (palavra.length() < 2) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Cada parte do nome deve ter pelo menos 2 caracteres")
                        .addConstraintViolation();
                return false;
            }
        }

        return true;
    }
}