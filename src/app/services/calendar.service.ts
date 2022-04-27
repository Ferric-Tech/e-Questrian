import { Injectable } from '@angular/core';
import { Appointments } from 'src/interfaces/appointments.interface';
import { CalendarData } from 'src/interfaces/calander.interface';
import { CommonUtilitiesService } from './common-utilities.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private appointments: Appointments = {};
  calendarData = {} as CalendarData;

  constructor(private commonUtilities: CommonUtilitiesService) {}

  setCalendarFromAppointments() {
    this.calendarData = {};
    this.getAppointmentData();

    Object.keys(this.appointments).forEach((ID) => {
      const appDateStr = new Date(this.appointments[ID].date).toDateString();
      const newTimeBlock = {
        time: this.appointments[ID].startTime,
        appointments: [ID],
      };

      if (appDateStr in this.calendarData) {
        let dateBlock = this.calendarData[appDateStr];
        let timeFound = false;

        for (let index = 0; index < dateBlock.length; index++) {
          let timeBlock = this.calendarData[appDateStr][index];

          // If date and time exsist in the calendar
          if (this.isEqual(timeBlock.time, this.appointments[ID].startTime)) {
            timeBlock.appointments.push(ID);
            timeFound = true;
            break;
          }
        }

        // If date exsist in the calendar but there is no matching time block with in that date
        if (!timeFound) {
          this.calendarData[appDateStr].push(newTimeBlock);
        }
      } else {
        // If date does not exsist in the calendar
        this.calendarData[appDateStr] = [newTimeBlock];
      }
    });

    return this.calendarData;
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private isEqual(object1: any, object2: any) {
    return this.commonUtilities.isEqualObjects(object1, object2);
  }
}
