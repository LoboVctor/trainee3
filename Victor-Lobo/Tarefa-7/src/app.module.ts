import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculosModule } from './veiculos/veiculos.module';

@Module({
  imports: [VeiculosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
