import { Time } from '@angular/common';
import { Client } from './clients.interface';

export interface CalendarData {
  [date: string]: CalendarBlock[];
}

export interface CalendarBlock {
  time: Time;
  appointments: AppointmentDetail[];
}

export interface Appointment {
  [appointmentID: string]: AppointmentDetail[];
}

export interface AppointmentDetail {
  title: string;
  date: Date;
  startTime: Time;
  endTime: Time;
  client: Client;
  invoice: number;
}
