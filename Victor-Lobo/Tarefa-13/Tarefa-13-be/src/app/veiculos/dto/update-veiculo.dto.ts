import { IsNumber, IsOptional, Min } from "class-validator";

export class UpdateVeiculoDto{
    @IsOptional()
    modelo?: string;
    
    @IsOptional()
    marca?: string;
    
    @IsOptional()
    @IsNumber()
    @Min(1950)
    ano?: number;

    @IsOptional()
    placa?: string;
}