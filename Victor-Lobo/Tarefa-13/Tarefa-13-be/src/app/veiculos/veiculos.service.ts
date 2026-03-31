import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculosRepository: Repository<Veiculo>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const veiculo = this.veiculosRepository.create(createVeiculoDto);
    return await this.veiculosRepository.save(veiculo);
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculosRepository.find();
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculosRepository.findOneBy({ id });
    if (!veiculo) {
      throw new NotFoundException();
    }
    return veiculo;
  }

  async update(
    id: number,
    updateVeiculoDto: UpdateVeiculoDto,
  ): Promise<Veiculo> {
    await this.veiculosRepository.update(id, updateVeiculoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id);
    await this.veiculosRepository.remove(veiculo);
  }
}
