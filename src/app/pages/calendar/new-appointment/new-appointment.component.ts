import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() startTime: string = '';
  @Output() canceled = new EventEmitter<void>();

  times = ['8:00', '8:30'];
  displayTime = '';

  constructor() {
    this.displayTime = this.startTime;
  }

  ngOnInit(): void {}

  onCancelClick() {
    this.canceled.emit();
  }
}
