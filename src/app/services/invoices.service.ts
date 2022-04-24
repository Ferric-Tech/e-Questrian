import { Injectable } from '@angular/core';
import {
  AppointmentDetail,
  CalendarData,
} from 'src/interfaces/calander.interface';
import { Invoice } from 'src/interfaces/invoices.interface';
import { AppointmentsService } from './appointments.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  today: Date = new Date();
  calendarData: CalendarData = {};
  invoices: Invoice[] = [];

  constructor(private appointmentService: AppointmentsService) {}

  generateInvoices() {
    this.setDates();
    this.getCalendarData();
    let newInvoices: Invoice[] = [];

    // Get a list of all clients to be invoiced
    let clientsToBeInvoiced: { [key: string]: AppointmentDetail[] } = {};
    Object.keys(this.calendarData).forEach((date) => {
      this.calendarData[date].forEach((calendarBlock) => {
        calendarBlock.appointments.forEach((appointment) => {
          if (appointment.invoice == 0) {
            if (
              Object.keys(clientsToBeInvoiced).indexOf(
                appointment.client.displayName
              ) < 0
            ) {
              clientsToBeInvoiced[appointment.client.displayName] = [
                appointment,
              ];
            } else {
              clientsToBeInvoiced[appointment.client.displayName].push(
                appointment
              );
            }
          }
        });
      });
    });

    // Add an invoice for each client to be invoiced
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
    let lastInvoiceNumber = this.invoices.length;
    Object.keys(clientsToBeInvoiced).forEach((client) => {
      newInvoices.push({
        number: lastInvoiceNumber + 1,
        client: {
          displayName: client,
          firstName: client,
          lastName: '',
          email: '',
          telephoneNumber: '',
        },
        date: this.today,
        amount: clientsToBeInvoiced[client].length * 250,
      });
      clientsToBeInvoiced[client].forEach((oldAppointment) => {
        let newAppointment = Object.assign({}, oldAppointment);
        newAppointment.invoice = lastInvoiceNumber;
        this.appointmentService.editAppointment(oldAppointment, newAppointment);
      });
      lastInvoiceNumber++;
    });

    // Add new invoices to stored data
    invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
    newInvoices.forEach((invoice) => {
      this.invoices.push(invoice);
    });
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  private getCalendarData() {
    let calanderString = localStorage.getItem('calendar');
    this.calendarData = JSON.parse(calanderString || '{}');
  }

  private setDates() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
  }
}
