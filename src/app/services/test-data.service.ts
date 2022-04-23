import { Injectable } from '@angular/core';
import { Appointment, CalendarData } from 'src/interfaces/calander.interface';
import { Client } from 'src/interfaces/clients.interface';
import { Invoice } from 'src/interfaces/invoices.interface';
import { AppointmentsService } from './appointments.service';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  today: Date = new Date();
  tomorrow: Date = new Date();
  todayFormatted = '';
  tomorrowFormatted = '';
  yesterday: Date = new Date();
  calendarData: CalendarData = {};
  clients: Client[] = [];
  clientDisplayNames: string[] = [];
  invoices: Invoice[] = [];

  constructor(private appointmentService: AppointmentsService) {}

  loadTestDataToLocal() {
    this.setDates();
    this.setClientsList();
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.setCalendarObjects();
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  private setDates() {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow.setHours(0, 0, 0, 0);
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.yesterday.setHours(0, 0, 0, 0);
  }

  private setCalendarObjects() {
    this.calendarData[this.today.toDateString()] = [
      {
        time: { hours: 8, minutes: 0 },
        appointments: [
          {
            title: 'Lesson with ' + this.clients[0].firstName,
            date: this.today,
            startTime: { hours: 8, minutes: 0 },
            endTime: { hours: 8, minutes: 30 },
            client: this.clients[0],
            invoice: 0,
          },
          {
            title: 'Lesson with ' + this.clients[1].firstName,
            date: this.today,
            startTime: { hours: 8, minutes: 0 },
            endTime: { hours: 8, minutes: 30 },
            client: this.clients[1],
            invoice: 0,
          },
        ],
      },
      {
        time: { hours: 8, minutes: 30 },
        appointments: [
          {
            title: 'Lesson with ' + this.clients[2].firstName,
            date: this.today,
            startTime: { hours: 8, minutes: 30 },
            endTime: { hours: 9, minutes: 0 },
            client: this.clients[2],
            invoice: 0,
          },
        ],
      },
    ];

    this.calendarData[this.tomorrow.toDateString()] = [
      {
        time: { hours: 7, minutes: 30 },
        appointments: [
          {
            title: 'Lesson with ' + this.clients[3].firstName,
            date: this.tomorrow,
            startTime: { hours: 7, minutes: 30 },
            endTime: { hours: 8, minutes: 0 },
            client: this.clients[3],
            invoice: 0,
          },
        ],
      },
      {
        time: { hours: 8, minutes: 0 },
        appointments: [
          {
            title: 'Lesson with ' + this.clients[0].firstName,
            date: this.tomorrow,
            startTime: { hours: 8, minutes: 0 },
            endTime: { hours: 8, minutes: 30 },
            client: this.clients[0],
            invoice: 0,
          },
          {
            title: 'Lesson with ' + this.clients[1].firstName,
            date: this.tomorrow,
            startTime: { hours: 8, minutes: 0 },
            endTime: { hours: 8, minutes: 30 },
            client: this.clients[1],
            invoice: 0,
          },
        ],
      },
    ];
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

  editClient(oldClient: Client, newClient: Client) {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
    this.removeClient(oldClient);
    this.addClient(newClient);
  }

  removeClient(client: Client) {
    for (let index = 0; index < this.clients.length; index++) {
      if (JSON.stringify(this.clients[index]) === JSON.stringify(client)) {
        this.clients.splice(index, 1);
        break;
      }
    }
  }

  addClient(client: Client) {
    this.clients.push(client);
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }

  private setInvoices() {
    this.invoices = [
      { number: 1, client: this.clients[0], date: this.yesterday, amount: 250 },
      { number: 2, client: this.clients[1], date: this.yesterday, amount: 175 },
      { number: 3, client: this.clients[2], date: this.yesterday, amount: 300 },
    ];
  }

  generateInvoices() {
    let newInvoices: Invoice[] = [];

    // Get a list of all clients to be invoiced
    let clientsToBeInvoiced: { [key: string]: Appointment[] } = {};
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
}
