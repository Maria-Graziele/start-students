// component reutilizável, tanto pra editar quanto apenas ler

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-group">
      <label class="form-label" [for]="id">
        {{ label }}
        <span *ngIf="required && !readonly" class="required">*</span>
      </label>
      <div class="input-wrapper" [class.disabled]="readonly">
        <img [src]="icon" [alt]="label" class="input-icon" *ngIf="icon">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="readonly"
          [readonly]="readonly"
          class="form-input"
        />
      </div>
      <div class="field-error" *ngIf="errorMessage">
        {{ errorMessage }}
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

    .required {
      color: #dc2626;
      margin-left: 2px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrapper.disabled {
      opacity: 0.9;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      width: 18px;
      height: 18px;
      opacity: 0.5;
      pointer-events: none;
    }

    .form-input {
      width: 100%;
      min-width: 0;
      padding: 14px 14px 14px 42px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 0.9rem;
      color: #111827;
      background-color: #f9fafb;
      transition: all 0.2s;
    }

    .form-input:disabled,
    .form-input:read-only {
      cursor: not-allowed;
    }

    .form-input:not(:disabled):not(:read-only):focus {
      outline: none;
      border-color: #3b82f6;
      background-color: #ffffff;
    }

    .field-error {
      font-size: 0.875rem;
      color: #dc2626;
      margin-top: 4px;
    }
  `]
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() value: string | number | null = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() errorMessage: string = '';
  @Input() id: string = `field-${Math.random().toString(36).substr(2, 9)}`;
}
