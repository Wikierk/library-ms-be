import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Autor } from './autor.entity';
import { Ksiazka } from './ksiazka.entity';

@Entity('ksiazka_autor')
export class KsiazkaAutor {
  @PrimaryColumn({ type: 'char', length: 36 })
  autorId: string;

  @PrimaryColumn()
  ksiazkaId: string;

  @ManyToOne(() => Autor, (autor) => autor.ksiazkaAutor, {
    onDelete: 'CASCADE',
  })
  autor: Autor;

  @ManyToOne(() => Ksiazka, (ksiazka) => ksiazka.ksiazkaAutor, {
    onDelete: 'CASCADE',
  })
  ksiazka: Ksiazka;
}
