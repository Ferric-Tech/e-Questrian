import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointment } from 'src/interfaces/calander.interface';

@Component({
  selector: 'app-new-appointment-modal',
  templateUrl: './appointment-detail.modal.html',
  styleUrls: ['./appointment-detail.modal.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() startTime: string = '';
  @Input() appointment = {} as Appointment;
  @Output() canceled = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<any>();
  @Output() editedAppointment = new EventEmitter<any>();

  isNewAppointment: boolean | undefined;
  modalHeader = '';
  appoitmentForm = new FormGroup({
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
    this.isNewAppointment = Object.keys(this.appointment).length == 0;
    this.setScreen();
    this.setForm();
    this.setClients();
    this.setCalendarBlocks();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    this.isNewAppointment
      ? this.newAppointment.emit(this.appoitmentForm)
      : this.editedAppointment.emit(this.appoitmentForm);
  }

  onCancelClick() {
    this.canceled.emit();
  }

  // Minor actions callbacks
  onStartTimeSelected(time: string) {
    // Delete all the times before startTime
  }

  // Private functions related to initialisation of the component
  private setScreen() {
    this.modalHeader = this.isNewAppointment
      ? 'New appointment'
      : 'Edit appointment';
  }

  private setForm() {
    this.isNewAppointment ? this.setFormForEdit() : this.setFormForNew();
  }

  private setFormForNew() {
    let endTime = this.determineEndTime(this.startTime);
    this.appoitmentForm = new FormGroup({
      title: new FormControl('New appointment'),
      startTime: new FormControl(this.startTime),
      endTime: new FormControl(endTime),
      client: new FormControl(''),
    });
  }

  private setFormForEdit() {
    this.appoitmentForm = new FormGroup({
      title: new FormControl(this.appointment.title || ''),
      startTime: new FormControl(this.appointment.startTime || ''),
      endTime: new FormControl(this.appointment.endTime || ''),
      client: new FormControl(this.appointment.client || ''),
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

  private setClients() {
    let calanderString = localStorage.getItem('clients');
    this.clients = JSON.parse(calanderString || '[]');
  }

  private setCalendarBlocks() {
    for (let i = 6; i < 18; i++) {
      this.times.push(i + ':00');
      this.times.push(i + ':30');
    }
  }
}
