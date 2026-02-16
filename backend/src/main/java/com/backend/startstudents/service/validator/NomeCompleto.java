package com.backend.startstudents.service.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NomeCompletoValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface NomeCompleto {

    String message() default "Nome inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}