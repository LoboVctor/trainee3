import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVeiculoDto {
  @IsNotEmpty()
  modelo: string;

  @IsNumber()
  @Min(1885)
  ano: number;

  @IsNotEmpty()
  placa: string;
}
