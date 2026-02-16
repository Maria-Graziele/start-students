import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componente reutilizável de controles de paginação
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination-container" *ngIf="totalPages > 1">

      <!-- Controles de navegação -->
      <div class="pagination-controls">
        <!-- Primeira página -->
        <button
          class="pagination-button"
          [disabled]="currentPage === 0"
          (click)="goToPage(0)"
          title="Primeira página">
          «
        </button>

        <!-- Página anterior -->
        <button
          class="pagination-button"
          [disabled]="currentPage === 0"
          (click)="goToPage(currentPage - 1)"
          title="Página anterior">
          ‹
        </button>

        <!-- Números de página -->
        <ng-container *ngFor="let page of visiblePages">
          <button
            *ngIf="page !== null"
            class="pagination-button page-number"
            [class.active]="page === currentPage"
            (click)="goToPage(page)">
            {{ page + 1 }}
          </button>
          <span *ngIf="page === null" class="pagination-ellipsis">...</span>
        </ng-container>

        <!-- Próxima página -->
        <button
          class="pagination-button"
          [disabled]="currentPage === totalPages - 1"
          (click)="goToPage(currentPage + 1)"
          title="Próxima página">
          ›
        </button>

        <!-- Última página -->
        <button
          class="pagination-button"
          [disabled]="currentPage === totalPages - 1"
          (click)="goToPage(totalPages - 1)"
          title="Última página">
          »
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 0;
    }

    .pagination-info {
      font-size: 0.875rem;
      color: #6c757d;
      font-weight: 500;
    }

    .pagination-controls {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .pagination-button {
      min-width: 40px;
      height: 40px;
      padding: 0.5rem;
      border: 1px solid #dee2e6;
      background-color: white;
      color: #495057;
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pagination-button:hover:not(:disabled):not(.active) {
      background-color: #e9ecef;
      border-color: #adb5bd;
    }

    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #f8f9fa;
    }

    .pagination-button.active {
      background-color: #e53e3e;
      color: white;
      border-color: #e53e3e;
      font-weight: 600;
    }

    .pagination-button.page-number {
      min-width: 40px;
    }

    .pagination-ellipsis {
      display: flex;
      align-items: center;
      padding: 0 0.5rem;
      color: #6c757d;
    }

    @media (max-width: 768px) {
      .pagination-controls {
        gap: 0.25rem;
      }

      .pagination-button {
        min-width: 35px;
        height: 35px;
        font-size: 0.8rem;
      }

      .pagination-info {
        font-size: 0.75rem;
      }
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() maxVisiblePages: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  get startItem(): number {
    return this.currentPage * this.itemsPerPage + 1;
  }

  get endItem(): number {
    const end = (this.currentPage + 1) * this.itemsPerPage;
    return Math.min(end, this.totalItems);
  }

  get visiblePages(): (number | null)[] {
    const pages: (number | null)[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(0, this.currentPage - half);
    let end = Math.min(this.totalPages - 1, this.currentPage + half);

    // Ajusta se estiver no início
    if (this.currentPage < half) {
      end = Math.min(this.totalPages - 1, this.maxVisiblePages - 1);
    }

    // Ajusta se estiver no final
    if (this.currentPage > this.totalPages - half - 1) {
      start = Math.max(0, this.totalPages - this.maxVisiblePages);
    }

    // Adiciona primeira página + elipse se necessário
    if (start > 0) {
      pages.push(0);
      if (start > 1) {
        pages.push(null); // elipse
      }
    }

    // Adiciona páginas visíveis
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Adiciona elipse + última página se necessário
    if (end < this.totalPages - 1) {
      if (end < this.totalPages - 2) {
        pages.push(null); // elipse
      }
      pages.push(this.totalPages - 1);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
