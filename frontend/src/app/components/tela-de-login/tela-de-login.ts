import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-tela-de-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tela-de-login.html',
  styleUrls: ['./tela-de-login.scss']
})
export class TelaDeLoginComponent {
  username: string = '';
  password: string = '';
  usuarioValido: boolean = false;
  senhaValida: boolean = false;

  constructor(private router: Router) {}

  validarCampo(valor: string): boolean {
    if (valor.length < 8) return false;
    const temLetra = /[a-zA-Z]/.test(valor);
    const temNumero = /[0-9]/.test(valor);
    return temLetra && temNumero;
  }

  verificarCampos(): void {
    this.usuarioValido = this.validarCampo(this.username);
    this.senhaValida = this.validarCampo(this.password);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.usuarioValido && this.senhaValida) {
      console.log('Usuário:', this.username);
      console.log('Senha:', this.password);

      this.router.navigate(['/alunos']);
    }
  }
}