import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { PlacaBrasilPipe } from 'src/pipes/placa-brasil.pipe';
import { BuscarPlacaDto } from './dto/buscar-placa.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ whitelist: true }))
    createVeiculoDto: CreateVeiculoDto,
  ) {
    return await this.veiculosService.create(createVeiculoDto);
  }

  @Get()
  async findAll() {
    return await this.veiculosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.veiculosService.findOne(id);
  }

  // Usando @Query para não dar conflito de rota
  @Get()
  buscarPlaca(
    @Query(new ValidationPipe({ whitelist: true }))
    query: BuscarPlacaDto,
  ) {
    const placaNormalizada = new PlacaBrasilPipe().transform(query.placa);

    return {
      placaNormalizada,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateVeiculoDto: UpdateVeiculoDto,
  ) {
    return await this.veiculosService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.veiculosService.remove(id);
  }
}
