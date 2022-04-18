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
    this.currentAppointment = {} as Appointment;
    this.proposedStartTime = block;
    this.displayNewAppointmentForm = true;
  }

  onAppointmentClick(appointment: Appointment) {
    this.currentAppointment = appointment;
    this.displayNewAppointmentForm = true;
  }

  newAppointmentCreated(newAppointment: Appointment) {
    this.testDataService.addNewAppointment(this.dateFormatted, newAppointment);
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentEdited(newAppointment: Appointment) {
    this.testDataService.editCurrentAppointment(
      this.dateFormatted,
      this.currentAppointment,
      newAppointment
    );
    this.addAppointmentsToCalendar();
    this.displayNewAppointmentForm = false;
  }

  appointmentDetailModalCanceled() {
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
