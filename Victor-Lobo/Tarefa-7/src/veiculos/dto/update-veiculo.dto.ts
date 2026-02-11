export interface Veiculo {
    id: number
    modelo: string
    ano: number
}

export class UpdateVeiculoDto {
    modelo: string
    ano: number
}