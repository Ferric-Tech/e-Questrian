import { Injectable } from '@angular/core';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { CalendarData } from 'src/app/interfaces/calander.interface';
import { Clients } from 'src/app/interfaces/clients.interface';
import { CreditNotes, Invoices } from 'src/app/interfaces/invoices.interface';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  today: Date = new Date();
  tomorrow: Date = new Date();
  yesterday: Date = new Date();
  calendarData: CalendarData = {};
  clients = {} as Clients;
  clientDisplayNames: string[] = [];
  invoices = {} as Invoices;
  creditNotes = {} as CreditNotes;
  appointments: Appointments = {};

  loadTestDataToLocal() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.setAppointments();
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    this.setCreditNotes();
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
  }

  private setClientsList() {
    this.clients = {
      '1': {
        displayName: 'Little Ash',
        firstName: 'Ashley',
        lastName: 'Novello',
        email: 'cedric@telkomsa.co.za',
        telephoneNumber: '072 462 4685',
      },
      '2': {
        displayName: 'Jill Henry',
        firstName: 'Jill',
        lastName: 'Henry',
        email: 'jill@gmail.com',
        telephoneNumber: '072 879 5421',
      },
      '3': {
        displayName: 'Kenny Timson',
        firstName: 'Kenny',
        lastName: 'Timson',
        email: 'kenny@yahoo.com',
        telephoneNumber: '083 357 2205',
      },
      '4': {
        displayName: 'Nurse Ash',
        firstName: 'Ashley',
        lastName: 'van der Merwe',
        email: 'nurseash@life.co.za',
        telephoneNumber: '066 565 0000',
      },
    };
  }

  private setAppointments() {
    this.appointments = {
      '1': {
        title: 'Lesson with ' + this.clients['3'].firstName,
        date: this.yesterday,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients['3'],
        invoice: 1,
        cancelled: false,
      },
      '2': {
        title: 'Lesson with ' + this.clients['4'].firstName,
        date: this.yesterday,
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 10, minutes: 30 },
        client: this.clients['4'],
        invoice: 2,
        cancelled: false,
      },
      '3': {
        title: 'Lesson with ' + this.clients['4'].firstName,
        date: this.yesterday,
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
        client: this.clients['4'],
        invoice: 2,
        cancelled: true,
        creditNote: 1,
      },
      '4': {
        title: 'Lesson with ' + this.clients['1'].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients['1'],
        invoice: 0,
        cancelled: false,
      },
      '5': {
        title: 'Lesson with ' + this.clients['2'].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients['2'],
        invoice: 0,
        cancelled: false,
      },
      '6': {
        title: 'Lesson with ' + this.clients['3'].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 30 },
        endTime: { hours: 9, minutes: 0 },
        client: this.clients['3'],
        invoice: 0,
        cancelled: false,
      },
      '7': {
        title: 'Lesson with ' + this.clients['4'].firstName,
        date: this.tomorrow,
        startTime: { hours: 7, minutes: 30 },
        endTime: { hours: 8, minutes: 0 },
        client: this.clients['4'],
        invoice: 0,
        cancelled: false,
      },
      '8': {
        title: 'Lesson with ' + this.clients['1'].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients['1'],
        invoice: 0,
        cancelled: false,
      },
      '9': {
        title: 'Lesson with ' + this.clients['2'].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients['2'],
        invoice: 0,
        cancelled: false,
      },
    };
  }

  private setInvoices() {
    this.invoices = { '1': ['1'], '2': ['2', '3'] };
  }

  private setCreditNotes() {
    this.creditNotes = { '1': '3' };
  }
}
