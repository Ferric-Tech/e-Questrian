import { Injectable } from '@angular/core';
import { Appointment, CalendarData } from 'src/interfaces/calander.interface';
import { Client } from 'src/interfaces/clients.interface';
import { Invoice } from 'src/interfaces/invoices.interface';

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

  constructor() {}

  editCurrentAppointment(
    date: string,
    priorDetails: Appointment,
    newDetails: Appointment
  ) {
    this.removeAppointment(date, priorDetails);
    this.addAppointment(newDetails);
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

    this.addAppointment(newAppointment);
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
  }

  private addAppointment(appointment: Appointment) {
    const newDateFormatted =
      appointment.date.getFullYear() +
      '-' +
      (appointment.date.getMonth() + 1) +
      '-' +
      appointment.date.getDate();

    if (Object.keys(this.calendarData).indexOf(newDateFormatted) > -1) {
      for (
        let index = 0;
        index < this.calendarData[newDateFormatted].length;
        index++
      ) {
        if (
          this.calendarData[newDateFormatted][index].time ==
          appointment.startTime
        ) {
          this.calendarData[newDateFormatted][index].appointments.push(
            appointment
          );
          return;
        }
      }
      this.calendarData[newDateFormatted].push({
        time: appointment.startTime,
        appointments: [appointment],
      });
      return;
    }
    this.calendarData[newDateFormatted] = [
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
    this.setInvoices();
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }

  private setDates() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
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
            date: this.today,
            startTime: '8:00',
            endTime: '8:30',
            client: this.clients[0],
            invoice: 0,
          },
          {
            title: 'Lesson with Bill',
            date: this.today,
            startTime: '8:00',
            endTime: '8:30',
            client: this.clients[1],
            invoice: 0,
          },
        ],
      },
      {
        time: '8:30',
        appointments: [
          {
            title: 'Lesson with Ashley',
            date: this.today,
            startTime: '8:30',
            endTime: '9:00',
            client: this.clients[2],
            invoice: 0,
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
            date: this.tomorrow,
            startTime: '8:00',
            endTime: '8:30',
            client: this.clients[3],
            invoice: 0,
          },
        ],
      },
      {
        time: '8:00',
        appointments: [
          {
            title: 'Lesson with Ashley',
            date: this.tomorrow,
            startTime: '8:30',
            endTime: '9:00',
            client: this.clients[0],
            invoice: 0,
          },
          {
            title: 'Lesson with Joan',
            date: this.tomorrow,
            startTime: '8:00',
            endTime: '8:30',
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
    let clientsToBeInvoiced: { [key: string]: number } = {};
    Object.keys(this.calendarData).forEach((date) => {
      this.calendarData[date].forEach((calendarBlock) => {
        calendarBlock.appointments.forEach((appointment) => {
          if (
            Object.keys(clientsToBeInvoiced).indexOf(
              appointment.client.displayName
            ) < 0
          ) {
            clientsToBeInvoiced[appointment.client.displayName] = 1;
          } else {
            clientsToBeInvoiced[appointment.client.displayName] =
              clientsToBeInvoiced[appointment.client.displayName] + 1;
          }
        });
      });
    });

    // Add an invoice for each client to be invoiced
    let lastInvoiceNumber = 3;
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
        amount: clientsToBeInvoiced[client] * 250,
      });
      lastInvoiceNumber++;
    });

    // Add new invoices to stored data
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
    newInvoices.forEach((invoice) => {
      this.invoices.push(invoice);
    });
    localStorage.setItem('invoices', JSON.stringify(this.invoices));
  }
}
