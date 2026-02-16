// apenas mostrar foto

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo-container">
      <div class="photo-wrapper">
        <img
          [src]="photoUrl || 'assets/icon/placeholder-user.png'"
          (error)="onImageError($event)"
          class="photo-image"
          [alt]="altText"
        />
      </div>
    </div>
  `,
  styles: [`
    .photo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .photo-wrapper {
      width: 140px;
      height: 170px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `]
})
export class PhotoDisplayComponent {
  @Input() photoUrl: string | null = null;
  @Input() altText: string = 'Foto';
  @Output() imageError = new EventEmitter<Event>();

  private imagemErroTratado = false;

  onImageError(event: Event): void {
    if (this.imagemErroTratado) {
      return;
    }

    const img = event.target as HTMLImageElement;
    this.imagemErroTratado = true;
    img.src = 'assets/icon/placeholder-user.png';

    this.imageError.emit(event);
  }
}
