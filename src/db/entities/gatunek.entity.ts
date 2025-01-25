import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { KsiazkaGatunek } from './ksiazka-gatunek.entity';

@Entity('gatunek')
export class Gatunek {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  nazwa: string;

  @OneToMany(() => KsiazkaGatunek, (ksiazkaGatunek) => ksiazkaGatunek.gatunek, {
    onDelete: 'CASCADE',
  })
  ksiazkaGatunek: KsiazkaGatunek[];
}
