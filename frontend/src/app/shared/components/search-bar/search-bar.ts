import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Componente reutilizável de barra de busca

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-bar">
      <div class="search-input-wrapper">
        <input
          type="text"
          class="search-input"
          [placeholder]="placeholder"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange($event)"
        />
        <button
          *ngIf="searchTerm"
          class="clear-button"
          (click)="clearSearch()"
          type="button">
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
  .search-bar {
    width: 100%;

  }

  .search-input-wrapper {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid #e5e7eb;
    border-radius: 50px;
    font-size: 14px;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.35-4.35'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 16px center;
    background-size: 18px;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #9ca3af;
  }

  .search-input::placeholder {
    color: #d1d5db;
  }

  .clear-button {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 14px;
    color: #6b7280;
    cursor: pointer;
  }

  .clear-button:hover {
    color: #ef4444;
  }
`]
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() debounceTime: number = 300;

  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';
  private debounceTimer: any;

  onSearchChange(value: string): void {
    // Limpa timer anterior
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Cria novo timer
    this.debounceTimer = setTimeout(() => {
      this.search.emit(value.trim());
    }, this.debounceTime);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
  }
}
