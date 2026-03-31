import { Component, OnInit, signal } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css'
})
export class Listagem implements OnInit {

  veiculos = signal<Veiculo[]>([]);
  veiculoEditando = signal<Veiculo | null>(null);

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.veiculoService.listar().subscribe({
      next: (dados) => this.veiculos.set(dados)
    });
  }

  editar(veiculo: Veiculo): void {
    this.veiculoEditando.set({ ...veiculo });
  }

  salvar(): void {
    const veiculo = this.veiculoEditando();
    if (!veiculo) return;

    const { id, ...dados } = veiculo;

    this.veiculoService.atualizar(id, dados).subscribe({
      next: (atualizado) => {
        this.veiculos.update(lista =>
          lista.map(v => v.id === id ? atualizado : v)
        );
        this.veiculoEditando.set(null);
      }
    });
  }

  cancelar(): void {
    this.veiculoEditando.set(null);
  }

  deletar(id: number): void {
    if (!confirm('Deseja excluir este veículo?')) return;

    this.veiculoService.deletar(id).subscribe({
      next: () => {
        this.veiculos.update(lista =>
          lista.filter(v => v.id !== id)
        );
      }
    });
  }
}