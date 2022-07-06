import { Time } from '@angular/common';
import { ClientDetail } from './clients.interface';

export interface Appointments {
  [appointmentID: number]: AppointmentDetail;
}

export interface AppointmentDetail {
  subject: string;
  date: Date;
  startTime: Time;
  endTime: Time;
  client: ClientDetail;
  invoice: number;
  cancelled: boolean;
  creditNote?: number;
}
