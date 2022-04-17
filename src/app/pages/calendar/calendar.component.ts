import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calenderBlocks: string[] = [];
  displayNewAppointmentForm = false;
  proposedStartTime: string = '';

  constructor() {
    this.setCalendarBlocks();
  }

  ngOnInit(): void {}

  onCalendarBlockClick(block: string) {
    this.proposedStartTime = block;
    this.displayNewAppointmentForm = true;
  }

  newAppointmentCreated(newAppointment: FormGroup) {
    console.log(newAppointment.value);
    this.displayNewAppointmentForm = false;
  }

  newAppointmentCanceled() {
    this.displayNewAppointmentForm = false;
  }

  private setCalendarBlocks() {
    for (let i = 6; i < 18; i++) {
      this.calenderBlocks.push(i + ':00');
      this.calenderBlocks.push(i + ':30');
    }
  }
}
