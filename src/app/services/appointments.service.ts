import { Injectable } from '@angular/core';
import { CalendarData, Appointment } from 'src/interfaces/calander.interface';
import { CommonUtilitiesService } from './common-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private calendarData: CalendarData = {};

  constructor(private commonUtilities: CommonUtilitiesService) {}

  newAppointment(newAppointment: Appointment) {
    this.getCalendarData();
    newAppointment.invoice = 0;
    this.addAppointment(newAppointment);
    this.setCalendarData();
  }

  cancelAppointment(appointment: Appointment) {
    this.getCalendarData();
    this.removeAppointment(appointment);
    this.setCalendarData();
  }

  editAppointment(priorDetails: Appointment, newDetails: Appointment) {
    this.getCalendarData();
    this.removeAppointment(priorDetails);
    this.addAppointment(newDetails);
    this.setCalendarData();
  }

  private addAppointment(appointment: Appointment) {
    const dateString = appointment.date.toDateString();
    const newTimeBlock = {
      time: appointment.startTime,
      appointments: [appointment],
    };

    if (Object.keys(this.calendarData).indexOf(dateString) > -1) {
      let calendarForDay = this.calendarData[dateString];
      for (let index = 0; index < calendarForDay.length; index++) {
        if (this.isEqual(calendarForDay[index].time, appointment.startTime)) {
          this.calendarData[dateString][index].appointments.push(appointment);
          return;
        }
      }
      calendarForDay.push(newTimeBlock);
      return;
    }
    this.calendarData[dateString] = [newTimeBlock];
  }

  private removeAppointment(appointment: Appointment) {
    const dateString = new Date(appointment.date).toDateString();
    const calendarForDay = this.calendarData[dateString];

    for (let block = 0; block < calendarForDay.length; block++) {
      if (this.isEqual(calendarForDay[block].time, appointment.startTime)) {
        let appointmentsInBlock = calendarForDay[block].appointments;
        for (let index = 0; index < appointmentsInBlock.length; index++) {
          if (this.isEqual(appointmentsInBlock[index], appointment)) {
            calendarForDay[block].appointments.splice(index, 1);
            return;
          }
        }
      }
    }
  }

  private getCalendarData() {
    let calanderString = localStorage.getItem('calendar');
    this.calendarData = JSON.parse(calanderString || '{}');
  }

  private setCalendarData() {
    localStorage.setItem('calendar', JSON.stringify(this.calendarData));
  }

  private isEqual(object1: any, object2: any) {
    return this.commonUtilities.isEqualObjects(object1, object2);
  }
}
