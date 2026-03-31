import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';

function placaValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) return null;
  const antigoFormato = /^[A-Za-z]{3}[0-9]{4}$/.test(value);
  const mercosul = /^[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}$/.test(value);
  return antigoFormato || mercosul ? null : { placa: true };
}

@Component({
  selector: 'app-criacao',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './criacao.html',
  styleUrl: './criacao.css',
})
export class Criacao implements OnInit {
  form!: FormGroup;
  sucesso = false;
 
  constructor(private fb: FormBuilder, private veiculoService: VeiculoService) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950), Validators.max(2026)]],
      placa: ['', [Validators.required, placaValidator]],
    });
  }
 
  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.veiculoService.criar(this.form.value).subscribe({
      next: () => {
        this.sucesso = true;
        setTimeout(() => {
          this.form.reset();
          this.sucesso = false;
        }, 3000);
      },
      error: () => alert('Erro ao cadastrar veículo.'),
    });
  }
}
