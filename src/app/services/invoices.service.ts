import { Injectable } from '@angular/core';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { CalendarData } from 'src/app/interfaces/calander.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceParameters,
} from '../modals/generate-invoice/generate-invoice.modal';

export interface GenerateInvoiceResult {
  numberOfInvoices: number;
  clients: string[];
  startDate: Date;
  endDate: Date;
  totalValue: number;
  largestValue: number;
  averageValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  today: Date = new Date();
  calendarData: CalendarData = {};
  appointments: Appointments = {};
  invoices = {} as Invoices;

  generateInvoices(params: GenerateInvoiceParameters): GenerateInvoiceResult {
    let results = {
      numberOfInvoices: 0,
      clients: [],
      startDate: new Date(),
      endDate: new Date(),
      totalValue: 0,
      largestValue: 0,
      averageValue: 0,
    } as GenerateInvoiceResult;

    this.getAppointmentData();

    // If there is a clientRange - Get list of clients to be invoiced
    let clientsToBeInvoiced: string[] = [];
    if (params.clientRange !== ClientRange.ALL) {
      params.clients.forEach((client) => {
        clientsToBeInvoiced.push(client.displayName);
      });
    }

    // If there is a dateRange - get that date, else cutoff is 1 year ahead
    let cutOffDate = new Date(
      new Date().getFullYear() + 1,
      new Date().getMonth(),
      new Date().getDate()
    );
    if (params.dateRange === DateRange.LIMITED) {
      cutOffDate = new Date(params.date);
    }

    // Get all appointments to be invoiced (filtered for params)
    let appointmentsToInvoice = {} as { [client: string]: number[] };
    Object.keys(this.appointments).forEach((appointmentIDStr) => {
      const appointmentID = parseInt(appointmentIDStr);
      // Have the appointment been invoiced?
      if (this.appointments[appointmentID].invoice != 0) {
        return;
      }
      // Does appointment have a client
      if (!this.appointments[appointmentID].client?.displayName) {
        return;
      }
      let currentClient = this.appointments[appointmentID].client
        ?.displayName as string;

      // If there is a clientRange - is the current client in that range
      if (clientsToBeInvoiced.length > 0) {
        if (!clientsToBeInvoiced.includes(currentClient)) {
          return;
        }
      }
      // If there is a dateRange - is the current appointment in that range
      let appointmentDate = new Date(this.appointments[appointmentID].date);
      if (appointmentDate > cutOffDate) {
        return;
      }
      if (appointmentDate > results.endDate) {
        results.endDate = appointmentDate;
      }
      if (appointmentDate < results.startDate) {
        results.startDate = appointmentDate;
      }

      currentClient in appointmentsToInvoice
        ? appointmentsToInvoice[currentClient].push(appointmentID)
        : (appointmentsToInvoice[currentClient] = [appointmentID]);

      if (results.clients.includes(currentClient)) {
        return;
      }
      results.clients.push(currentClient);
    });

    // Add an invoice for each assigning the appointments to that invoice
    this.getInvoiceData();
    let nextInvoiceNumber = Object.keys(this.invoices).length + 1;
    let invoiceCount = 0;
    Object.keys(appointmentsToInvoice).forEach((client) => {
      this.invoices[nextInvoiceNumber] = {
        date: new Date(),
        appointments: appointmentsToInvoice[client],
      };
      appointmentsToInvoice[client].forEach((appointmentID) => {
        this.appointments[appointmentID].invoice = nextInvoiceNumber;
      });
      nextInvoiceNumber++;
      invoiceCount++;
      results.totalValue =
        results.totalValue + appointmentsToInvoice[client].length * 250;
      if (appointmentsToInvoice[client].length * 250 > results.largestValue) {
        results.largestValue = appointmentsToInvoice[client].length * 250;
      }
    });

    results.numberOfInvoices = invoiceCount;
    results.averageValue = results.totalValue / results.numberOfInvoices;
    // Add new invoices and appointements to stored data
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    localStorage.setItem('appointments', JSON.stringify(this.appointments));

    return results;
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private getInvoiceData() {
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
  }
}
