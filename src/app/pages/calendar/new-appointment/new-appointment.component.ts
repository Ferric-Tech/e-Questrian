import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() startTime: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
