import { Time } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { TestDataService } from 'src/app/services/test-data.service';
import {
  Appointment,
  CalendarBlock,
  CalendarData,
} from 'src/interfaces/calander.interface';

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
  calendarData: CalendarData = {};
  currentAppointment = {} as Appointment;
  appointmentEditActive = false;

  constructor(
    private appointmentService: AppointmentsService,
    private testDataService: TestDataService
  ) {}

  ngOnInit(): void {
    this.setCalendarBlocks();
    this.setTodaysDate();
    this.addAppointmentsToCalendar();
  }

  changeDate(movement: number) {
    this.date.setDate(this.date.getDate() + movement);
    this.date.setHours(0, 0, 0, 0);
    this.addAppointmentsToCalendar();
  }

  onCalendarBlockClick(block: Time) {
    if (this.appointmentEditActive) return;
    this.currentAppointment = {} as Appointment;
    this.proposedStartTime = block;
    this.displayNewAppointmentForm = true;
  }

  onAppointmentClick(appointment: Appointment) {
    this.appointmentEditActive = true;
    this.currentAppointment = appointment;
    this.displayNewAppointmentForm = true;
  }

  appointmentCreated(newAppointment: Appointment) {
    this.appointmentService.newAppointment(newAppointment);
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentEdited(appointment: Appointment) {
    this.appointmentEditActive = false;
    this.appointmentService.editAppointment(
      this.currentAppointment,
      appointment
    );
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentRemoved() {
    this.appointmentEditActive = false;
    this.appointmentService.cancelAppointment(this.currentAppointment);
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentDetailModalCanceled() {
    this.appointmentEditActive = false;
    this.displayNewAppointmentForm = false;
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

  private setTodaysDate() {
    this.date.setHours(0, 0, 0, 0);
    this.dateFormatted = this.date.toString();
  }

  private addAppointmentsToCalendar() {
    this.setCalendarBlocks();
    this.loadCalendarData();
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

  private loadCalendarData() {
    let calandarString = localStorage.getItem('calendar');
    this.calendarData = JSON.parse(calandarString || '{}');
  }
}
