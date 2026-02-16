import { Component } from '@angular/core';
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
usuarioInvalido: boolean = false;
senhaValida: boolean = false;
senhaInvalida: boolean = false;
mostrarSenha: boolean = false;

constructor(private router: Router) {}

validarCampo(valor: string): boolean {
const regex = /^(?=.*[0-9])[a-z0-9._]{8,13}$/;
return regex.test(valor);
}

verificarSenha(): void {
const valor = this.password || '';
const regex = /^[0-9]{6,8}$/;
this.senhaInvalida = valor.length > 0 && !regex.test(valor);
}

normalizarUsuario(): void {
this.username = this.username
.toLowerCase()
.replace(/[^a-z0-9]/g, '');
}

normalizarSenha(): void {
this.password = this.password
.toLowerCase()
.replace(/[^a-z0-9]/g, '')
}

permitirApenasNumeros(event: KeyboardEvent): void {
const tecla = event.key;
if (!/^[0-9]$/.test(tecla)) {
event.preventDefault();
}
}

toggleMostrarSenha(): void {
  this.mostrarSenha = !this.mostrarSenha;
}

verificarCampos(): void {
const valor = this.username || '';
const regexUsuario = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{8}/;
this.usuarioValido = regexUsuario.test(valor);

const senha = this.password || '';
const regexSenha = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{6,8}/;
this.senhaValida = regexSenha.test(senha);
}

onSubmit(event: Event): void {
event.preventDefault();
if (this.usuarioValido && this.senhaValida) {
this.router.navigate(['/alunos']);
}
}
}
