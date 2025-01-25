import { DataSource } from 'typeorm';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
import migrations from './db/migrations';
import { Ksiazka } from './db/entities/ksiazka.entity';
import { KsiazkaAutor } from './db/entities/ksiazka-autor.entity';
import { KsiazkaGatunek } from './db/entities/ksiazka-gatunek.entity';
import { Czytelnik } from './db/entities/czytelnik.entity';
import { Pracownik } from './db/entities/pracownik.entity';
import { Autor } from './db/entities/autor.entity';
import { Gatunek } from './db/entities/gatunek.entity';
import { Jezyk } from './db/entities/jezyk.entity';
import { Stanowisko } from './db/entities/stanowisko.entity';
import { Wypozyczenie } from './db/entities/wypozyczenia.entity';

export const typeOrmConfig: OracleConnectionOptions = {
  type: 'oracle',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 1521),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWD,
  serviceName: process.env.DB_NAME,
  migrationsRun: true,
  synchronize: true,
  logging: true,
  entities: [
    Ksiazka,
    KsiazkaAutor,
    KsiazkaGatunek,
    Czytelnik,
    Pracownik,
    Autor,
    Gatunek,
    Jezyk,
    Stanowisko,
    Wypozyczenie,
  ],
  migrations: migrations,
};

const AppDataSource = new DataSource(typeOrmConfig);

export default AppDataSource;
