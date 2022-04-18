export interface CalendarData {
  [key: string]: CalendarBlock[];
}

export interface CalendarBlock {
  time: string;
  appointments: Appointment[];
}

export interface Appointment {
  title: string;
  startTime: string;
  endTime: string;
  client: string;
}
