import { Injectable } from '@angular/core';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { CalendarData } from 'src/app/interfaces/calander.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  ClientRange,
  DateRange,
  GenerateInvoiceParameters,
} from '../modals/generate-invoice/generate-invoice.modal';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  today: Date = new Date();
  calendarData: CalendarData = {};
  appointments: Appointments = {};
  invoices = {} as Invoices;

  generateInvoices(params: GenerateInvoiceParameters) {
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

      currentClient in appointmentsToInvoice
        ? appointmentsToInvoice[currentClient].push(appointmentID)
        : (appointmentsToInvoice[currentClient] = [appointmentID]);
    });

    // Add an invoice for each assigning the appointments to that invoice
    this.getInvoiceData();
    let nextInvoiceNumber = Object.keys(this.invoices).length + 1;
    Object.keys(appointmentsToInvoice).forEach((client) => {
      this.invoices[nextInvoiceNumber] = {
        date: new Date(),
        appointments: appointmentsToInvoice[client],
      };
      appointmentsToInvoice[client].forEach((appointmentID) => {
        this.appointments[appointmentID].invoice = nextInvoiceNumber;
      });
      nextInvoiceNumber++;
    });

    // Add new invoices and appointements to stored data
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
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
