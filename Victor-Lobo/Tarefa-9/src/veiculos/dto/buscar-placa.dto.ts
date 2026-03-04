import { IsString } from 'class-validator';

export class BuscarPlacaDto {
  @IsString()
  placa: string;
}
