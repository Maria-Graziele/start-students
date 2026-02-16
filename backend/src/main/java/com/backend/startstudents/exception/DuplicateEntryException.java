package com.backend.startstudents.exception;

public class DuplicateEntryException extends RuntimeException {
    public DuplicateEntryException(String message) {
        super(message);
    }

    public DuplicateEntryException(String field, String value) {
        super(field + " '" + value + "' já está cadastrado no sistema");
    }
}