import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  proposedStartTime: string = '';
  calendarData: CalendarData = {};
  currentAppointment = {} as Appointment;
  appointmentEditActive = false;

  constructor(private testDataService: TestDataService) {}

  ngOnInit(): void {
    this.setCalendarBlocks();
    this.setTodaysDate();
    this.addAppointmentsToCalendar();
  }

  onLeftArrowClick() {
    this.date.setDate(this.date.getDate() - 1);
    this.dateFormatted =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.addAppointmentsToCalendar();
  }

  onRightArrowClick() {
    this.date.setDate(this.date.getDate() + 1);
    this.dateFormatted =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.addAppointmentsToCalendar();
  }

  onCalendarBlockClick(block: string) {
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
    this.testDataService.addNewAppointment(this.dateFormatted, newAppointment);
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentEdited(appointment: Appointment) {
    this.appointmentEditActive = false;
    this.testDataService.editCurrentAppointment(
      this.dateFormatted,
      this.currentAppointment,
      appointment
    );
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentRemoved() {
    this.appointmentEditActive = false;
    this.testDataService.cancelAppointment(
      this.dateFormatted,
      this.currentAppointment
    );
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentDetailModalCanceled() {
    this.appointmentEditActive = false;
    this.displayNewAppointmentForm = false;
  }

  private setCalendarBlocks() {
    this.calenderBlocks = [];
    for (let i = 6; i < 18; i++) {
      this.calenderBlocks.push({ time: i + ':00', appointments: [] });
      this.calenderBlocks.push({ time: i + ':30', appointments: [] });
    }
  }

  private setTodaysDate() {
    this.dateFormatted =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
  }

  private addAppointmentsToCalendar() {
    this.setCalendarBlocks();
    this.loadCalendarData();
    if (!this.calendarData[this.dateFormatted]) {
      return;
    }
    this.calendarData[this.dateFormatted].forEach((dataBlock) => {
      this.calenderBlocks.forEach((block) => {
        if (block.time == dataBlock.time) {
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
