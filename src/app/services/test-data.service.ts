import { Injectable } from '@angular/core';
import { CalendarData } from 'src/interfaces/calander.interface';

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

  loadTestDataToLocal() {
    this.setDates();
    this.setCalendarObjects();
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
    this.setClientsList();
    console.log(this.clients);
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
