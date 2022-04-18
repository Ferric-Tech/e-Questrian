import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalendarBlock } from 'src/interfaces/calander.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  today: Date | undefined;
  todayFormatted = '';
  calenderBlocks: CalendarBlock[] = [];
  displayNewAppointmentForm = false;
  proposedStartTime: string = '';

  constructor() {
    this.setCalendarBlocks();
  }

  ngOnInit(): void {
    this.setTodaysDate();
  }

  onCalendarBlockClick(block: string) {
    this.proposedStartTime = block;
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
    for (let i = 6; i < 18; i++) {
      this.calenderBlocks.push({ time: i + ':00', appointments: [] });
      this.calenderBlocks.push({ time: i + ':30', appointments: [] });
    }
  }

  private setTodaysDate() {
    this.today = new Date();
    this.todayFormatted =
      this.today.getFullYear() +
      '-' +
      (this.today.getMonth() + 1) +
      '-' +
      this.today.getDate();
  }
}
