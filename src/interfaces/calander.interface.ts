import { Time } from '@angular/common';
import { Client } from './clients.interface';

export interface CalendarData {
  [key: string]: CalendarBlock[];
}

export interface CalendarBlock {
  time: Time;
  appointments: Appointment[];
}

export interface Appointment {
  title: string;
  date: Date;
  startTime: Time;
  endTime: Time;
  client: Client;
  invoice: number;
}
