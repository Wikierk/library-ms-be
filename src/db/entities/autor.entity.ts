import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { KsiazkaAutor } from './ksiazka-autor.entity';

@Entity('autor')
export class Autor {
  @PrimaryColumn({ type: 'char', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  imie: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nazwisko: string;

  @OneToMany(() => KsiazkaAutor, (ksiazkaAutor) => ksiazkaAutor.autor, {
    onDelete: 'CASCADE',
  })
  ksiazkaAutor: KsiazkaAutor[];
}
