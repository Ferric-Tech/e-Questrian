import { Time } from '@angular/common';
import { ClientDetail } from './clients.interface';

export enum AppointmentType {
  Lesson,
  Other,
}

export interface Appointments {
  [appointmentID: number]: AppointmentDetail;
}

export interface AppointmentDetail {
  type: AppointmentType;
  subject: string;
  date: Date;
  startTime: Time;
  endTime: Time;
  client: ClientDetail;
  invoice: number;
  cancelled: boolean;
  creditNote?: number;
}
