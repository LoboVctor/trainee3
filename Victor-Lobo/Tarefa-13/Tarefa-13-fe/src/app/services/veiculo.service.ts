import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';
 
@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private readonly apiUrl = 'http://localhost:3000/api/veiculos';
 
  constructor(private http: HttpClient) {}
 
  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }
 
  criar(veiculo: Partial<Veiculo>): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo);
  }
 
  atualizar(id: number, veiculo: Partial<Veiculo>): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo);
  }
 
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}