import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Gatunek } from './gatunek.entity';
import { Ksiazka } from './ksiazka.entity';

@Entity('ksiazka_gatunek')
export class KsiazkaGatunek {
  @PrimaryColumn()
  gatunekId: string;

  @PrimaryColumn()
  ksiazkaId: string;

  @ManyToOne(() => Gatunek, (gatunek) => gatunek.ksiazkaGatunek, {
    onDelete: 'CASCADE',
  })
  gatunek: Gatunek;

  @ManyToOne(() => Ksiazka, (ksiazka) => ksiazka.ksiazkaGatunek, {
    onDelete: 'CASCADE',
  })
  ksiazka: Ksiazka;
}
