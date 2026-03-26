import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormRecord,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

function placaValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  if (!value) return null;
  const antigoFormato = /^[A-Za-z]{3}[0-9]{4}$/.test(value);
  const mercosul = /^[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}$/.test(value);
  return antigoFormato || mercosul ? null : { placa: true };
}

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleFormComponent implements OnInit {
  form!: FormGroup;
  sucesso = false;

  readonly acessoriosLabels: Record<string, string> = {
    arCondicionado: 'Ar-condicionado',
    vidros: 'Vidros eletricos',
    airbag: 'Airbag',
    abs: 'ABS',
    alarme: 'Alarme',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [null, [Validators.required, Validators.min(1950), Validators.max(2026)]],
      placa: ['', [Validators.required, placaValidator]],
      combustivel: ['', Validators.required],
      condicao: ['', Validators.required],
      transmissao: ['', Validators.required],

      // Lista dinâmica (FormArray)
      proprietariosAnteriores: this.fb.array([]),

      // FormRecord
      acessorios: this.fb.record({
        arCondicionado: new FormControl(false, { nonNullable: true }),
        vidros: new FormControl(false, { nonNullable: true }),
        airbag: new FormControl(false, { nonNullable: true }),
        abs: new FormControl(false, { nonNullable: true }),
        alarme: new FormControl(false, { nonNullable: true }),
      }),
    });
  }

  get proprietariosAnteriores(): FormArray {
    return this.form.get('proprietariosAnteriores') as FormArray;
  }

  get acessorios(): FormRecord<FormControl<boolean>> {
    return this.form.get('acessorios') as FormRecord<FormControl<boolean>>;
  }

  get acessoriosKeys(): string[] {
    return Object.keys(this.acessorios.controls);
  }

  // Proprietarios

  adicionarProprietario(): void {
    const grupo = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
    });
    this.proprietariosAnteriores.push(grupo);
  }

  removerProprietario(index: number): void {
    this.proprietariosAnteriores.removeAt(index);
  }

  getProprietarioGroup(index: number): FormGroup {
    return this.proprietariosAnteriores.at(index) as FormGroup;
  }

  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  isInvalidArrayField(index: number, field: string): boolean {
    const control = this.getProprietarioGroup(index).get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  // Submit e Reset

  onSubmit(): void {
    if (this.form.valid) {
      this.sucesso = true;
      setTimeout(() => {
        this.form.reset();
        this.proprietariosAnteriores.clear();
        this.sucesso = false;
      }, 3000);
    } else {
      this.form.markAllAsTouched();
    }
  }

  resetar(): void {
    this.form.reset();
    this.proprietariosAnteriores.clear();
    this.sucesso = false;
  }
}
