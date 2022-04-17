import { Component, HostListener, OnInit } from '@angular/core';

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
