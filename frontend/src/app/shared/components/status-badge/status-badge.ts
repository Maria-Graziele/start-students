// exibir o status do aluno, com uma bolinha colorida

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-group">
      <label class="form-label">{{ label }}</label>
      <div class="status-container">
        <span
          class="status-indicator"
          [class.status-active]="status === 'Ativo'"
          [class.status-inactive]="status === 'Inativo'">
        </span>
        <span class="status-text">{{ status }}</span>
      </div>
    </div>
  `,
  styles: [`
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }

    .status-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 14px 14px 42px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background-color: #f9fafb;
      position: relative;
    }

    .status-container::before {
      content: '';
      position: absolute;
      left: 12px;
      width: 18px;
      height: 18px;
      opacity: 0.5;
    }

    .status-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .status-active {
      background-color: #10b981;
    }

    .status-inactive {
      background-color: #f1df4f;
    }

    .status-text {
      font-size: 0.9rem;
      color: #111827;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() label: string = 'Status';
  @Input() status: 'Ativo' | 'Inativo' = 'Ativo';
}
