import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database';
import { VeiculosModule } from './veiculos/veiculos.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), VeiculosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
