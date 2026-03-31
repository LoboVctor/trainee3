import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVeiculoDto {
    @IsNotEmpty()
    modelo!: string;
    
    @IsNotEmpty()
    marca!: string;
    
    @IsNumber()
    @Min(1950)
    ano!: number;

    @IsNotEmpty()
    placa!: string;
}