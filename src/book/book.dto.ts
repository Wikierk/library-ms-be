import { Author } from 'src/author/author.dto';
import { Genre } from 'src/genre/genre.dto';
import { Language } from 'src/language/language.dto';

export class Book {
  id: string;
  isbn: string;
  tytul: string;
  dataPublikacji: Date;
  okladkaUrl: string;
  jezyk: Language;
  autorzy: Author[];
  gatunki: Genre[];
}
