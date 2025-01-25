import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Stanowisko } from './stanowisko.entity';
import { Wypozyczenie } from './wypozyczenia.entity';

@Entity('pracownik')
export class Pracownik {
  @PrimaryColumn({ type: 'char', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  imie: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nazwisko: string;

  @Column({ type: 'date', nullable: true })
  dataZatrudnienia: Date;

  @Column({ type: 'number', nullable: true })
  pensja: number;

  @ManyToOne(() => Stanowisko, (stanowisko) => stanowisko.pracownicy)
  stanowisko: Stanowisko;

  @OneToMany(() => Wypozyczenie, (wypozyczenie) => wypozyczenie.pracownik)
  wypozyczenia: Wypozyczenie[];
}
