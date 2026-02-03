import { Component, EventEmitter, Input, output, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-modal-confirmacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmacao.html',
  styleUrls: ['./modal-confirmacao.scss']
})

export class ModalConfirmacaoComponent {
  @Input() titulo: string = 'Confirmar Exclusão';
  @Input() mensagem: string = 'Deseja realmente excluir?';
  @Input() nomeBotaoConfirmar: string = 'Excluir';
  @Input() nomeBotaoCancelar: string = 'Cancelar';
  @Input() mostrar: boolean = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onConfirmar(): void {
    this.confirmar.emit();
  }

  onCancelar(): void {
    this.cancelar.emit();
  }

  //Fecha o modal ao clicar no backdrop(fundo escuro)
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onCancelar();
    }
  }
}
