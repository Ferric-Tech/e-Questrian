import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment } from 'src/interfaces/calander.interface';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() startTime: string = '';
  @Input() appointment = {} as Appointment;
  @Output() canceled = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<any>();

  modalHeader = '';
  newAppoitmentForm = new FormGroup({
    title: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    client: new FormControl(''),
  });

  times: string[] = [];
  clients: string[] = [];
  displayTime = '';

  constructor() {}

  ngOnInit(): void {
    this.setScreen();
    this.setForm();
    this.loadClients();
    this.setCalendarBlocks();
  }

  onStartTimeSelected(time: string) {
    // Delete all the times before startTime
  }

  onSubmit() {
    this.newAppointment.emit(this.newAppoitmentForm);
  }

  onCancelClick() {
    this.canceled.emit();
  }

  private setScreen() {
    if (Object.keys(this.appointment).length != 0) {
      this.modalHeader = 'Edit appointment';
      return;
    }
    this.modalHeader = 'New appointment';
  }

  setForm() {
    if (Object.keys(this.appointment).length != 0) {
      this.newAppoitmentForm = new FormGroup({
        title: new FormControl(this.appointment.title || ''),
        startTime: new FormControl(this.appointment.startTime || ''),
        endTime: new FormControl(this.appointment.endTime || ''),
        client: new FormControl(this.appointment.client || ''),
      });
      return;
    }
    let endTime = this.determineEndTime(this.startTime);
    this.newAppoitmentForm = new FormGroup({
      title: new FormControl('New appointment'),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(endTime),
      client: new FormControl(''),
    });
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

  private loadClients() {
    let calanderString = localStorage.getItem('clients');
    this.clients = JSON.parse(calanderString || '[]');
  }
}
