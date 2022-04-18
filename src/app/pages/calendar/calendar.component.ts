import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  calenderData: CalendarData = {};
  appointment = {} as Appointment;

  constructor() {}

  ngOnInit(): void {
    this.setCalendarBlocks();
    this.setTodaysDate();
    this.addAppointments();
  }

  onLeftArrowClick() {
    this.date.setDate(this.date.getDate() - 1);
    this.dateFormatted =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.addAppointments();
  }

  onRightArrowClick() {
    this.date.setDate(this.date.getDate() + 1);
    this.dateFormatted =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.addAppointments();
  }

  onCalendarBlockClick(block: string) {
    this.appointment = {} as Appointment;
    this.proposedStartTime = block;
    this.displayNewAppointmentForm = true;
  }

  onAppointmentClick(appointment: Appointment) {
    console.log(appointment);
    this.appointment = appointment;
    this.displayNewAppointmentForm = true;
  }

  newAppointmentCreated(newAppointment: FormGroup) {
    this.calenderBlocks.forEach((block) => {
      if (block.time == newAppointment.controls['startTime'].value) {
        block.appointments.push(newAppointment.value);
      }
    });

    this.displayNewAppointmentForm = false;
  }

  newAppointmentCanceled() {
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

  private addAppointments() {
    this.setCalendarBlocks();
    this.loadCalendarData();
    this.calenderData[this.dateFormatted].forEach((dataBlock) => {
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
    let calanderString = localStorage.getItem('calendar');
    this.calenderData = JSON.parse(calanderString || '{}');
  }
}
