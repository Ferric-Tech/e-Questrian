import { Injectable } from '@angular/core';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { CalendarData } from 'src/app/interfaces/calander.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  today: Date = new Date();
  calendarData: CalendarData = {};
  appointments: Appointments = {};
  invoices = {} as Invoices;

  generateInvoices() {
    // Get all appointments to be invoiced by client
    this.getAppointmentData();
    let appointmentsToInvoice = {} as { [client: string]: number[] };
    Object.keys(this.appointments).forEach((appointmentIDStr) => {
      const appointmentID = parseInt(appointmentIDStr);
      if (this.appointments[appointmentID].invoice == 0) {
        let displayName = this.appointments[appointmentID].client.displayName;
        displayName in appointmentsToInvoice
          ? appointmentsToInvoice[displayName].push(appointmentID)
          : (appointmentsToInvoice[displayName] = [appointmentID]);
      }
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
