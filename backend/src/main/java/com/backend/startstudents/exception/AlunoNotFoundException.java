package com.backend.startstudents.exception;

public class AlunoNotFoundException extends RuntimeException{

    public AlunoNotFoundException(String message) { super(message); }

    public AlunoNotFoundException(String message, Throwable cause) { super(message, cause); }
}
