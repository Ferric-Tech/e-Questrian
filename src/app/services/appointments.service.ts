import { Injectable } from '@angular/core';
import {
  AppointmentDetail,
  Appointments,
} from 'src/interfaces/appointments.interface';
import { CalendarData } from 'src/interfaces/calander.interface';
import { CommonUtilitiesService } from './common-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private calendarData: CalendarData = {};
  private appointments: Appointments = {};

  constructor(private commonUtilities: CommonUtilitiesService) {}

  newAppointment(newAppointment: AppointmentDetail) {
    this.getAppointmentData();
    newAppointment.invoice = 0;
    this.addAppointment(newAppointment);
    this.setAppointmentData();
  }

  cancelAppointment(appointmentID: string) {
    this.getAppointmentData();
    this.removeAppointment(appointmentID);
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

  private removeAppointment(appointmentID: string) {
    delete this.appointments[appointmentID];
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private setAppointmentData() {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  private isEqual(object1: any, object2: any) {
    return this.commonUtilities.isEqualObjects(object1, object2);
  }
}
