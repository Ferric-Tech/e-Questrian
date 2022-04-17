import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() startTime: string = '';
  @Output() canceled = new EventEmitter<void>();

  newAppoitmentForm = new FormGroup({
    title: new FormControl('New appointment'),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  times: string[] = [];
  displayTime = '';

  constructor() {}

  ngOnInit(): void {
    this.setCalendarBlocks();
    this.newAppoitmentForm.controls['startTime'].setValue(this.startTime);
    let endTime = this.determineEndTime(this.startTime);
    this.newAppoitmentForm.controls['endTime'].setValue(endTime);
  }

  onStartTimeSelected(time: string) {
    // Delete all the times before this
  }

  onSubmit() {}

  onCancelClick() {
    this.canceled.emit();
  }

  private determineEndTime(startTime: string) {
    let hour = startTime.substring(0, startTime.indexOf(':'));
    let minutes = startTime.substring(
      startTime.indexOf(':') + 1,
      startTime.length
    );
    let endHour = '';
    let endMinutes = '';
    if (minutes == '30') {
      endHour = (parseInt(hour, 10) + 1).toString();
      endMinutes = '00';
    } else {
      endHour = hour;
      endMinutes = '30';
    }
    return endHour + ':' + endMinutes;
  }

  private setCalendarBlocks() {
    for (let i = 6; i < 18; i++) {
      this.times.push(i + ':00');
      this.times.push(i + ':30');
    }
  }
}
