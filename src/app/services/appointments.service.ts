import { Injectable } from '@angular/core';
import {
  AppointmentDetail,
  Appointments,
} from 'src/app/interfaces/appointments.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private appointments: Appointments = {};

  newAppointment(newAppointment: AppointmentDetail) {
    this.getAppointmentData();
    newAppointment.invoice = 0;
    this.addAppointment(newAppointment);
    this.setAppointmentData();
  }

  cancelAppointment(appointmentID: string) {
    this.getAppointmentData();
    this.appointments[appointmentID].cancelled = true;
    this.setAppointmentData();
  }

  editAppointment(appointmentID: string, newDetails: AppointmentDetail) {
    this.getAppointmentData();
    this.appointments[appointmentID] = newDetails;
    this.setAppointmentData();
  }

  private addAppointment(appointment: AppointmentDetail) {
    const appointmentID = (
      Object.keys(this.appointments).length + 1
    ).toString();
    this.appointments[appointmentID] = appointment;
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private setAppointmentData() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
