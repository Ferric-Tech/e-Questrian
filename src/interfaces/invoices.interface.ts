import { ClientDetail } from './clients.interface';

export interface Invoice {
  number: number;
  client: ClientDetail;
  date: Date;
  amount: number;
}
