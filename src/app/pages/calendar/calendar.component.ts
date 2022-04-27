import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { CalendarService } from 'src/app/services/calendar.service';
import {
  AppointmentDetail,
  Appointments,
} from 'src/interfaces/appointments.interface';
import { CalendarBlock, CalendarData } from 'src/interfaces/calander.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  date = new Date();
  dateFormatted = '';
  calenderBlocks: CalendarBlock[] = [];
  displayNewAppointmentForm = false;
  proposedStartTime: Time = {} as Time;
  appointments: Appointments = {};
  currentAppointmentID = '';
  appointmentEditActive = false;
  calendarData = {} as CalendarData;

  constructor(
    private appointmentService: AppointmentsService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.setTodaysDate();
    this.setCalendar();
  }

  changeDate(movement: number) {
    this.date = new Date(this.date);
    this.date.setDate(this.date.getDate() + movement);
    this.date.setHours(0, 0, 0, 0);
    this.setCalendar();
  }

  calendarBlockClicked(blockTime: Time) {
    if (this.appointmentEditActive) return;
    this.currentAppointmentID = '0';
    this.proposedStartTime = blockTime;
    this.displayNewAppointmentForm = true;
  }

  appointmentClicked(appointmentID: string) {
    this.appointmentEditActive = true;
    this.currentAppointmentID = appointmentID;
    this.displayNewAppointmentForm = true;
  }

  appointmentDetailModalCanceled() {
    this.appointmentEditActive = false;
    this.displayNewAppointmentForm = false;
  }

  appointmentCreated(newAppointment: AppointmentDetail) {
    this.appointmentService.newAppointment(newAppointment);
    this.setCalendar();
    console.log(this.calendarData);
    this.displayNewAppointmentForm = false;
  }

  appointmentEdited(appointment: AppointmentDetail) {
    this.appointmentEditActive = false;
    this.appointmentService.editAppointment(
      this.currentAppointmentID,
      appointment
    );
    this.setCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentRemoved() {
    this.appointmentEditActive = false;
    this.appointmentService.cancelAppointment(this.currentAppointmentID);
    this.setCalendar();
    this.displayNewAppointmentForm = false;
  }

  private setTodaysDate() {
    this.date.setHours(0, 0, 0, 0);
    this.dateFormatted = this.date.toString();
  }

  private setCalendar() {
    this.getAppointments();
    this.setCalenderData();
    this.setCalendarBlocks();
    const stringDate = this.date.toDateString();
    if (!this.calendarData[stringDate]) {
      return;
    }
    this.calendarData[stringDate].forEach((dataBlock) => {
      this.calenderBlocks.forEach((block) => {
        if (
          block.time.hours == dataBlock.time.hours &&
          block.time.minutes == dataBlock.time.minutes
        ) {
          dataBlock.appointments.forEach((appointment) => {
            block.appointments.push(appointment);
          });
        }
      });
    });
  }

  private getAppointments() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private setCalenderData() {
    this.calendarData = this.calendarService.setCalendarFromAppointments();
  }

  private setCalendarBlocks() {
    this.calenderBlocks = [];
    for (let hour = 6; hour < 18; hour++) {
      this.calenderBlocks.push({
        time: { hours: hour, minutes: 0 },
        appointments: [],
      });
      this.calenderBlocks.push({
        time: { hours: hour, minutes: 30 },
        appointments: [],
      });
    }
  }
}
