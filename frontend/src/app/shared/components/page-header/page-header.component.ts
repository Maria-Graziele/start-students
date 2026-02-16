// component: cabeçalho/topo da página com título e botão voltar

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="card-header">
      <button
        class="botao-voltar-topo"
        (click)="onBack()"
        aria-label="Voltar"
        type="button">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="page-title">{{ title }}</h1>
    </header>
  `,
  styles: [`
    .card-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 8px;
    }

    .botao-voltar-topo {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
    }

    .botao-voltar-topo:hover {
      opacity: 0.7;
    }

    .botao-voltar-topo .material-icons {
      font-size: 20px;
    }

    .page-title {
      font-size: 20px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Output() back = new EventEmitter<void>();

  onBack(): void {
    this.back.emit();
  }
}
