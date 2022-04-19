import { Client } from './clients.interface';

export interface Invoice {
  number: number;
  client: Client;
  date: Date;
  amount: number;
}
