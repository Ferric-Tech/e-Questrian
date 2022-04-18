import { Injectable } from '@angular/core';
import { Appointment, CalendarData } from 'src/interfaces/calander.interface';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  today: Date | undefined;
  tomorrow: Date | undefined;
  todayFormatted = '';
  tomorrowFormatted = '';
  calendarData: CalendarData = {};
  clients: string[] = [];

  constructor() {}

  editCurrentAppointment(
    date: string,
    priorDetails: Appointment,
    newDetails: Appointment
  ) {
    this.removeAppointment(date, priorDetails);
    this.addAppointment(date, newDetails);
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
  }

  cancelAppointment(date: string, appointment: Appointment) {
    this.removeAppointment(date, appointment);
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
  }

  private removeAppointment(date: string, appointment: Appointment) {
    // Get current object on local
    let calanderString = localStorage.getItem('calendar');
    this.calendarData = JSON.parse(calanderString || '{}');

    for (let block = 0; block < this.calendarData[date].length; block++) {
      if (this.calendarData[date][block].time == appointment.startTime) {
        let appointments = this.calendarData[date][block].appointments;
        for (let index2 = 0; index2 < appointments.length; index2++) {
          if (
            JSON.stringify(appointments[index2]) === JSON.stringify(appointment)
          ) {
            this.calendarData[date][block].appointments.splice(index2, 1);
            return;
          }
        }
      }
    }
  }

  addNewAppointment(date: string, newAppointment: Appointment) {
    // Get current object on local
    let calanderString = localStorage.getItem('calendar');
    this.calendarData = JSON.parse(calanderString || '{}');

    this.addAppointment(date, newAppointment);
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
  }

  private addAppointment(date: string, appointment: Appointment) {
    // Add new appointment to object as required
    if (Object.keys(this.calendarData).indexOf(date) > -1) {
      for (let index = 0; index < this.calendarData[date].length; index++) {
        if (this.calendarData[date][index].time == appointment.startTime) {
          this.calendarData[date][index].appointments.push(appointment);
          return;
        }
      }
      this.calendarData[date].push({
        time: appointment.startTime,
        appointments: [appointment],
      });
      return;
    }
    this.calendarData[date] = [
      {
        time: appointment.startTime,
        appointments: [appointment],
      },
    ];
  }

  loadTestDataToLocal() {
    this.setDates();
    this.setCalendarObjects();
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }

  private setDates() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.todayFormatted =
      this.today.getFullYear() +
      '-' +
      (this.today.getMonth() + 1) +
      '-' +
      this.today.getDate();
    this.tomorrowFormatted =
      this.tomorrow.getFullYear() +
      '-' +
      (this.tomorrow.getMonth() + 1) +
      '-' +
      this.tomorrow.getDate();
  }

  private setCalendarObjects() {
    this.calendarData[this.todayFormatted] = [
      {
        time: '8:00',
        appointments: [
          {
            title: 'Lesson with Joan',
            startTime: '8:00',
            endTime: '8:30',
            client: 'Joan',
          },
          {
            title: 'Lesson with Bill',
            startTime: '8:00',
            endTime: '8:30',
            client: 'Bill',
          },
        ],
      },
      {
        time: '8:30',
        appointments: [
          {
            title: 'Lesson with Ashley',
            startTime: '8:30',
            endTime: '9:00',
            client: 'Ashley',
          },
        ],
      },
    ];

    this.calendarData[this.tomorrowFormatted] = [
      {
        time: '7:30',
        appointments: [
          {
            title: 'Lesson with Jill',
            startTime: '8:00',
            endTime: '8:30',
            client: 'Jill',
          },
        ],
      },
      {
        time: '8:00',
        appointments: [
          {
            title: 'Lesson with Ashley',
            startTime: '8:30',
            endTime: '9:00',
            client: 'Ashley',
          },
          {
            title: 'Lesson with Joan',
            startTime: '8:00',
            endTime: '8:30',
            client: 'Joan',
          },
        ],
      },
    ];
  }

  private setClientsList() {
    Object.keys(this.calendarData).forEach((date) => {
      this.calendarData[date].forEach((time) => {
        time.appointments.forEach((appointment) => {
          if (this.clients.indexOf(appointment.client) < 0) {
            this.clients.push(appointment.client);
          }
        });
      });
    });
    this.clients.sort();
  }
}
