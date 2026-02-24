import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() CreateVeiculoDto: CreateVeiculoDto) {
    return await this.veiculosService.create(CreateVeiculoDto);
  }

  @Get()
  async findAll() {
    return await this.veiculosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const veiculo = this.veiculosService.findOne(Number(id));

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado!');
    }
    return veiculo;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() UpdateVeiculoDto: UpdateVeiculoDto,
  ) {
    const update = this.veiculosService.update(Number(id), UpdateVeiculoDto);

    if (!update) {
      throw new NotFoundException('Veículo não encontrado!');
    }
    return update;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = this.veiculosService.remove(Number(id));

    if (!deleted) {
      throw new NotFoundException('Veículo não encontrado!');
    }
  }
}
