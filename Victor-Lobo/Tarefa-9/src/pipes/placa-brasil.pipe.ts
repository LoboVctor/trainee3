import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PlacaBrasilPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('Placa é obrigatória');
    }
    // Remove espaços, hífens e converte para maiúsculas
    const placaFormatada = value.trim().toUpperCase().replace(/[- ]/g, '');

    // Regex para padrão antigo: 3 letras + 4 números
    const regexAntigo = /^[A-Z]{3}[0-9]{4}$/;

    //Regex para padrão novo: 3 letras + 1 número + 1 letra + 2 números
    const regexNovo = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;

    const placaValida =
      regexAntigo.test(placaFormatada) || regexNovo.test(placaFormatada);

    if (!placaValida) {
      throw new BadRequestException('Placa inválida');
    }
    return placaFormatada;
  }
}
