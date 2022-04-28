import { Injectable } from '@angular/core';
import { Appointments } from '../interfaces/appointments.interface';
import { CreditNotes } from '../interfaces/credit-notes.interface';

@Injectable({
  providedIn: 'root',
})
export class CreditNotesService {
  private creditNotes: CreditNotes = {};
  private appointments: Appointments = {};

  generateCreditNote(appointmentID: number) {
    this.getCreditNoteData();
    this.getAppointmentData();
    const cnNumber = Object.keys(this.creditNotes).length + 1;
    this.creditNotes[cnNumber] = {
      date: new Date(),
      appointment: appointmentID,
    };
    this.appointments[appointmentID].creditNote = cnNumber;
    localStorage.setItem('credit-notes', JSON.stringify(this.creditNotes));
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  private getCreditNoteData() {
    let creditNotesString = localStorage.getItem('credit-notes');
    this.creditNotes = JSON.parse(creditNotesString || '{}');
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }
}
