import { Injectable } from '@angular/core';
import { Appointments } from 'src/interfaces/appointments.interface';
import { CalendarData } from 'src/interfaces/calander.interface';
import { Client } from 'src/interfaces/clients.interface';
import { Invoice } from 'src/interfaces/invoices.interface';
import { AppointmentsService } from './appointments.service';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  today: Date = new Date();
  tomorrow: Date = new Date();
  yesterday: Date = new Date();
  calendarData: CalendarData = {};
  clients: Client[] = [];
  clientDisplayNames: string[] = [];
  invoices: Invoice[] = [];
  appointments: Appointments = {};

  loadTestDataToLocal() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday.setDate(this.tomorrow.getDate() - 1);
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.setAppointments();
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  private setClientsList() {
    this.clients = [
      {
        displayName: 'Little Ash',
        firstName: 'Ashley',
        lastName: 'Novello',
        email: 'cedric@telkomsa.co.za',
        telephoneNumber: '072 462 4685',
      },
      {
        displayName: 'Jill Henry',
        firstName: 'Jill',
        lastName: 'Henry',
        email: 'jill@gmail.com',
        telephoneNumber: '072 879 5421',
      },
      {
        displayName: 'Kenny Timson',
        firstName: 'Kenny',
        lastName: 'Timson',
        email: 'kenny@yahoo.com',
        telephoneNumber: '083 357 2205',
      },
      {
        displayName: 'Nurse Ash',
        firstName: 'Ashley',
        lastName: 'van der Merwe',
        email: 'nurseash@life.co.za',
        telephoneNumber: '066 565 0000',
      },
    ];
    this.clients.sort((a, b) =>
      a.displayName > b.displayName ? 1 : b.displayName > a.displayName ? -1 : 0
    );
  }

  private setInvoices() {
    this.invoices = [
      { number: 1, client: this.clients[0], date: this.yesterday, amount: 250 },
      { number: 2, client: this.clients[1], date: this.yesterday, amount: 175 },
      { number: 3, client: this.clients[2], date: this.yesterday, amount: 300 },
    ];
  }

  private setAppointments() {
    this.appointments = {
      '1': {
        title: 'Lesson with ' + this.clients[0].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[0],
        invoice: 0,
      },
      '2': {
        title: 'Lesson with ' + this.clients[1].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[1],
        invoice: 0,
      },
      '3': {
        title: 'Lesson with ' + this.clients[2].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 30 },
        endTime: { hours: 9, minutes: 0 },
        client: this.clients[2],
        invoice: 0,
      },
      '4': {
        title: 'Lesson with ' + this.clients[3].firstName,
        date: this.tomorrow,
        startTime: { hours: 7, minutes: 30 },
        endTime: { hours: 8, minutes: 0 },
        client: this.clients[3],
        invoice: 0,
      },
      '5': {
        title: 'Lesson with ' + this.clients[0].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[0],
        invoice: 0,
      },
      '6': {
        title: 'Lesson with ' + this.clients[1].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[1],
        invoice: 0,
      },
    };
  }
}
