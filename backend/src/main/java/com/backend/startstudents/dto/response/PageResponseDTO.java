package com.backend.startstudents.dto.response;

import java.util.List;

public class PageResponseDTO<T> {

    private List<T> content;
    private int number;           // Página atual (0-based)
    private int size;             // Tamanho da página
    private long totalElements;   // Total de elementos
    private int totalPages;       // Total de páginas
    private boolean first;        // É a primeira página?
    private boolean last;         // É a última página?
    private boolean empty;        // Está vazia?

    // Construtor
    public PageResponseDTO(List<T> content, int number, int size,
                           long totalElements, int totalPages,
                           boolean first, boolean last, boolean empty) {
        this.content = content;
        this.number = number;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
        this.empty = empty;
    }

    // Getters e Setters
    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    public boolean isEmpty() {
        return empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }
}