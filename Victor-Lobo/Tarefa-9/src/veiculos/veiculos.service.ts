import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { Repository } from 'typeorm';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const veiculo = this.veiculoRepository.create(createVeiculoDto);
    return await this.veiculoRepository.save(veiculo);
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find();
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({ id });
    return veiculo;
  }

  async buscarPlaca(placa: string): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({ placa });
    return veiculo;
  }

  async update(
    id: number,
    uptadeVeiculoDto: UpdateVeiculoDto,
  ): Promise<Veiculo> {
    await this.veiculoRepository.update(id, uptadeVeiculoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id);
    await this.veiculoRepository.remove(veiculo);
  }
}
