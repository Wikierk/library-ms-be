import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Czytelnik } from './czytelnik.entity';
import { Ksiazka } from './ksiazka.entity';
import { Pracownik } from './pracownik.entity';

@Entity('wypozyczenie')
export class Wypozyczenie {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Czytelnik, (czytelnik) => czytelnik.wypozyczenia, {
    onDelete: 'CASCADE',
  })
  czytelnik: Czytelnik;

  @ManyToOne(() => Ksiazka, (ksiazka) => ksiazka.wypozyczenia, {
    onDelete: 'CASCADE',
  })
  ksiazka: Ksiazka;

  @ManyToOne(() => Pracownik, (pracownik) => pracownik.wypozyczenia, {
    onDelete: 'CASCADE',
  })
  pracownik: Pracownik;

  @Column({ type: 'date', nullable: true })
  dataWypozyczenia: Date;

  @Column({ type: 'date', nullable: true })
  dataZwrotu: Date;
}
