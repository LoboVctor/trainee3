import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculosModule } from './veiculos/veiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database';

@Module({
  imports: [VeiculosModule, TypeOrmModule.forRoot(databaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
