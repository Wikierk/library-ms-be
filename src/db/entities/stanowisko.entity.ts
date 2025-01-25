import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Pracownik } from './pracownik.entity';

@Entity('stanowisko')
export class Stanowisko {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nazwa: string;

  @OneToMany(() => Pracownik, (pracownik) => pracownik.stanowisko)
  pracownicy: Pracownik[];
}
