import { Time } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentDetail } from 'src/app/interfaces/appointments.interface';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';

export interface TimeOption {
  display: string;
  value: Time;
}

@Component({
  selector: 'app-new-appointment-modal',
  templateUrl: './appointment-detail.modal.html',
  styleUrls: ['./appointment-detail.modal.scss'],
})
export class NewAppointmentComponent implements OnInit {
  @Input() date: Date | undefined;
  @Input() startTime: Time = {} as Time;
  @Input() currentAppointment = {} as AppointmentDetail;
  @Output() canceled = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<AppointmentDetail>();
  @Output() editedAppointment = new EventEmitter<AppointmentDetail>();
  @Output() removeAppointment = new EventEmitter<void>();

  isNewAppointment: boolean | undefined;
  isRemoveAppointment = false;
  modalHeader = '';
  appoitmentForm = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    client: new FormControl(''),
  });
  timeOptions: TimeOption[] = [];
  clients = {} as Clients;
  displayTime = '';

  ngOnInit(): void {
    this.isNewAppointment = Object.keys(this.currentAppointment).length === 0;
    this.setTimeOptions();
    this.setScreen();
    this.setForm();
    this.setClients();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    this.isRemoveAppointment
      ? this.removeAppointment.emit()
      : this.isNewAppointment
      ? this.newAppointment.emit(this.appoitmentForm.value as AppointmentDetail)
      : this.editedAppointment.emit(
          this.appoitmentForm.value as AppointmentDetail
        );
  }

  onRemoveAppointmentClick() {
    this.isRemoveAppointment = true;
  }

  onCancelClick() {
    this.canceled.emit();
  }

  // Minor actions callbacks
  onStartTimeSelected(time: string) {
    // Delete all the times before startTime
  }

  compareTimes(o1: Time, o2: Time) {
    return o1.hours == o2.hours && o1.minutes == o2.minutes;
  }

  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }

  // Private functions related to initialisation of the component
  private setScreen() {
    this.modalHeader = this.isNewAppointment
      ? 'New appointment'
      : 'Edit appointment';
  }

  private setForm() {
    this.isNewAppointment ? this.setFormForNew() : this.setFormForEdit();
  }

  private setFormForNew() {
    let endTime = this.determineEndTime(this.startTime);
    this.appoitmentForm = new FormGroup({
      title: new FormControl('New appointment'),
      date: new FormControl(this.date),
      startTime: new FormControl({
        hours: this.startTime.hours,
        minutes: this.startTime.minutes,
      } as Time),
      endTime: new FormControl(endTime),
      client: new FormControl(''),
    });
  }

  private setFormForEdit() {
    this.appoitmentForm = new FormGroup({
      title: new FormControl(this.currentAppointment.title || ''),
      date: new FormControl(this.date || ''),
      startTime: new FormControl(this.currentAppointment.startTime),
      endTime: new FormControl(this.currentAppointment.endTime || ''),
      client: new FormControl(this.currentAppointment.client.displayName || ''),
    });
  }

  private determineEndTime(startTime: Time) {
    let minutes = startTime.minutes + 30;
    let hours = startTime.hours;
    if (minutes >= 60) {
      minutes = minutes - 60;
      hours = hours + 1;
    }

    return { hours: hours, minutes: minutes } as Time;
  }

  private setClients() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }

  private setTimeOptions() {
    for (let hour = 6; hour < 18; hour++) {
      this.timeOptions.push({
        value: { hours: hour, minutes: 0 } as Time,
        display: hour + ':00',
      });
      this.timeOptions.push({
        value: { hours: hour, minutes: 30 } as Time,
        display: hour + ':30',
      });
    }
  }
}
