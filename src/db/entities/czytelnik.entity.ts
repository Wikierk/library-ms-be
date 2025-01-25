import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Wypozyczenie } from './wypozyczenia.entity';

@Entity('czytelnik')
export class Czytelnik {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  imie: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  nazwisko: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefon: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: false })
  dataRejestracji: Date;

  @OneToMany(() => Wypozyczenie, (wypozyczenie) => wypozyczenie.czytelnik)
  wypozyczenia: Wypozyczenie[];
}
