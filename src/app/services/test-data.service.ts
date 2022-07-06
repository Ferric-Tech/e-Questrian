import { Injectable } from '@angular/core';
import {
  Appointments,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { Clients } from 'src/app/interfaces/clients.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import { PaymentType } from '../enums/payments.enum';
import { CreditNotes } from '../interfaces/credit-notes.interface';
import { Payments } from '../interfaces/payments.interface';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  // Date variables
  today: Date = new Date();
  tomorrow: Date = new Date();
  yesterday: Date = new Date();

  // Data variables
  clients = {} as Clients;
  appointments: Appointments = {};
  invoices = {} as Invoices;
  creditNotes = {} as CreditNotes;
  payments = {} as Payments;

  // Used enums

  loadTestDataToLocal() {
    this.setDates();
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.setAppointments();
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    this.setCreditNotes();
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    this.setPayments();
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }

  private setDates() {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private setClientsList() {
    this.clients = {
      1: {
        displayName: 'Little Ash',
        firstName: 'Ashley',
        lastName: 'Novello',
        email: 'cedric@telkomsa.co.za',
        telephoneNumber: '072 462 4685',
      },
      2: {
        displayName: 'Jill Henry',
        firstName: 'Jill',
        lastName: 'Henry',
        email: 'jill@gmail.com',
        telephoneNumber: '072 879 5421',
      },
      3: {
        displayName: 'Kenny Timson',
        firstName: 'Kenny',
        lastName: 'Timson',
        email: 'kenny@yahoo.com',
        telephoneNumber: '083 357 2205',
      },
      4: {
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
      1: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[3].firstName,
        date: this.yesterday,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[3],
        invoice: 1,
        cancelled: false,
      },
      2: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].firstName,
        date: this.yesterday,
        startTime: { hours: 10, minutes: 0 },
        endTime: { hours: 10, minutes: 30 },
        client: this.clients[4],
        invoice: 2,
        cancelled: false,
      },
      3: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].firstName,
        date: this.yesterday,
        startTime: { hours: 14, minutes: 0 },
        endTime: { hours: 14, minutes: 30 },
        client: this.clients[4],
        invoice: 2,
        cancelled: true,
        creditNote: 1,
      },
      4: {
        type: AppointmentType.Other,
        subject: 'Appointment with ' + this.clients[1].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[1],
        invoice: 0,
        cancelled: false,
      },
      5: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[2].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[2],
        invoice: 0,
        cancelled: false,
      },
      6: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[3].firstName,
        date: this.today,
        startTime: { hours: 8, minutes: 30 },
        endTime: { hours: 9, minutes: 0 },
        client: this.clients[3],
        invoice: 0,
        cancelled: false,
      },
      7: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[4].firstName,
        date: this.tomorrow,
        startTime: { hours: 7, minutes: 30 },
        endTime: { hours: 8, minutes: 0 },
        client: this.clients[4],
        invoice: 0,
        cancelled: false,
      },
      8: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[1].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[1],
        invoice: 0,
        cancelled: false,
      },
      9: {
        type: AppointmentType.Lesson,
        subject: 'Lesson with ' + this.clients[2].firstName,
        date: this.tomorrow,
        startTime: { hours: 8, minutes: 0 },
        endTime: { hours: 8, minutes: 30 },
        client: this.clients[2],
        invoice: 0,
        cancelled: false,
      },
    };
  }

  private setInvoices() {
    this.invoices = {
      1: { date: new Date(), appointments: [1] },
      2: { date: new Date(), appointments: [2, 3] },
    };
  }

  private setCreditNotes() {
    this.creditNotes = { 1: { date: new Date(), appointment: 3 } };
  }

  private setPayments() {
    this.payments = {
      1: {
        date: this.yesterday,
        client: 1,
        paymentType: PaymentType.EFT,
        amount: 175,
        voided: false,
      },
      2: {
        date: this.yesterday,
        client: 2,
        paymentType: PaymentType.CASH,
        amount: 100,
        voided: false,
      },
    };
  }
}
