import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('VeiculosTable')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column({ unique: true })
  placa: string;
}
