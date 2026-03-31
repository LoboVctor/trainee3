import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Criação da entidade (Tabela do Banco de dados)
@Entity({ name: 'veiculostable' })
export class Veiculo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'modelo', nullable: false })
  modelo!: string;

  @Column({ name: 'marca', nullable: false })
  marca!: string;

  @Column({ name: 'ano', nullable: false })
  ano!: number;

  @Column({ name: 'placa', nullable: false, unique: true })
  placa!: string;
}
