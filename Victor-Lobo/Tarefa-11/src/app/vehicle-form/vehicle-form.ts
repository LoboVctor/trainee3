import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleFormComponent {
  veiculo = {
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    marca: '',
    modelo: '',
    ano: null as number | null,
    placa: '',
    combustivel: '',
    condicao: '',
    transmissao: '',
    acessorios: {
      arCondicionado: false,
      vidros: false,
      airbag: false,
      abs: false,
      alarme: false,
    },
  };
 
  enviado = false;
  sucesso = false;
 
  onSubmit(form: NgForm): void {
    this.enviado = true;
    if (form.valid) {
      this.sucesso = true;
      setTimeout(() => {
        form.resetForm();
        this.enviado = false;
        this.sucesso = false;
      }, 3000);
    }
  }
 
  resetar(form: NgForm): void {
    form.resetForm();
    this.enviado = false;
    this.sucesso = false;
  }
}