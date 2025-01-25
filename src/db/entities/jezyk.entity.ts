import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Ksiazka } from './ksiazka.entity';

@Entity('jezyk')
export class Jezyk {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  nazwa: string;

  @OneToMany(() => Ksiazka, (ksiazka) => ksiazka.jezyk, { onDelete: 'CASCADE' })
  ksiazki: Ksiazka[];
}
