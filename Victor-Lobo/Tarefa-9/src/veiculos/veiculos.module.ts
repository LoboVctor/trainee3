import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './entities/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}
