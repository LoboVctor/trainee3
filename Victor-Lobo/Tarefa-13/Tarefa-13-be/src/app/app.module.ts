import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeiculosModule } from './veiculos/veiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './src/.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'veiculos_table',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    VeiculosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
