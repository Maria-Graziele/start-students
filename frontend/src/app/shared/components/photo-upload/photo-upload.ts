import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="photo-upload-wrapper">
      <!-- Preview da foto ou placeholder -->
      <div class="photo-preview-box">
        <img
          *ngIf="photoUrl"
          [src]="photoUrl"
          alt="Foto selecionada"
          class="photo-image"
          (error)="onImageError($event)"
        />
        <div *ngIf="!photoUrl" class="photo-placeholder">
          <span class="material-icons camera-icon">photo_camera</span>
        </div>
      </div>

      <!-- Botão de escolher foto -->
      <button
        type="button"
        class="btn-escolher-foto"
        (click)="triggerFileInput()">
        <span class="material-icons">photo_camera</span>
        Escolher Foto
      </button>

      <!-- Input file escondido -->
      <input
        #fileInput
        type="file"
        [accept]="allowedTypes.join(',')"
        (change)="onFileSelected($event)"
        style="display: none;"
      />

      <!-- Mensagem de erro -->
      <div *ngIf="error" class="error-message">
        <span class="material-icons">error_outline</span>
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .photo-upload-wrapper {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .photo-preview-box {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 2px dashed #d1d5db;
      overflow: hidden;
      background-color: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .camera-icon {
      font-size: 2rem;
      color: #9ca3af;
    }

    .btn-escolher-foto {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      background-color: white;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-escolher-foto:hover {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }

    .btn-escolher-foto:active {
      transform: scale(0.98);
    }

    .btn-escolher-foto .material-icons {
      font-size: 1.25rem;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #dc2626;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #fef2f2;
      border-radius: 4px;
      border-left: 3px solid #dc2626;
    }

    .error-message .material-icons {
      font-size: 1.125rem;
    }

    @media (max-width: 640px) {
      .photo-upload-wrapper {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class PhotoUploadComponent {
  @Input() photoUrl: string | undefined;
  @Input() maxSizeMB: number = 2;
  @Input() allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

  @Output() photoSelected = new EventEmitter<string>();
  @Output() photoError = new EventEmitter<string>();

  error: string | null = null;

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    this.error = null;

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // Valida tipo de arquivo
    if (!this.allowedTypes.includes(file.type)) {
      const tipos = this.allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ');
      this.error = `Tipo de arquivo não permitido. Use: ${tipos}`;
      this.photoError.emit(this.error);
      return;
    }

    // Valida tamanho
    const maxSizeBytes = this.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.error = `Arquivo muito grande. Máximo: ${this.maxSizeMB}MB`;
      this.photoError.emit(this.error);
      return;
    }

    // Converte para base64
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const base64 = e.target?.result as string;
      this.photoSelected.emit(base64);
    };
    reader.onerror = () => {
      this.error = 'Erro ao carregar a imagem';
      this.photoError.emit(this.error);
    };
    reader.readAsDataURL(file);

    // Limpa o input para permitir selecionar o mesmo arquivo novamente
    input.value = '';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/icons/placeholder-user.png';
  }
}
