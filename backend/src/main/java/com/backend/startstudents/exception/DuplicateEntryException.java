package com.backend.startstudents.exception;

public class DuplicateEntryException extends RuntimeException {

    private final String field;

    public DuplicateEntryException(String field, String value) {
        super(field + " já está cadastrado no sistema");
        this.field = field;
    }

    public String getField() {
        return field;
    }
}