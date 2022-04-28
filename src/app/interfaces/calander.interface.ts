import { Time } from '@angular/common';

export interface CalendarData {
  [date: string]: CalendarBlock[];
}

export interface CalendarBlock {
  time: Time;
  appointments: number[];
}
