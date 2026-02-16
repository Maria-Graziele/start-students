import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class]="size">
      <div class="spinner"></div>
      <p *ngIf="message" class="loading-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-container.small .spinner {
      width: 30px;
      height: 30px;
      border-width: 3px;
    }

    .loading-container.medium .spinner {
      width: 50px;
      height: 50px;
      border-width: 4px;
    }

    .loading-container.large .spinner {
      width: 70px;
      height: 70px;
      border-width: 5px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-message {
      color: #6c757d;
      font-size: 0.875rem;
      margin: 0;
      text-align: center;
    }

    .loading-container.small .loading-message {
      font-size: 0.75rem;
    }

    .loading-container.large .loading-message {
      font-size: 1rem;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
