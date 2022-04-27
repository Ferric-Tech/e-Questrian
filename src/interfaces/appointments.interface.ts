import { Time } from '@angular/common';
import { Client } from './clients.interface';

export interface Appointments {
  [appointmentID: string]: AppointmentDetail;
}

export interface AppointmentDetail {
  title: string;
  date: Date;
  startTime: Time;
  endTime: Time;
  client: Client;
  invoice: number;
}
