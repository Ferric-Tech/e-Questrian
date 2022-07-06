import { Time } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AppointmentDetail,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import {
  WarningSubjectType,
  WarningType,
} from '../warnings/warnings.component';

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
  @Output() closed = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<AppointmentDetail>();
  @Output() editedAppointment = new EventEmitter<AppointmentDetail>();
  @Output() cancelAppointment = new EventEmitter<void>();

  appointmentType = AppointmentType;
  warningType = WarningType.EDIT_SAVE;
  warningSubjectType = WarningSubjectType;
  isEditable = false;
  isNewAppointment: boolean = true;
  isRemoveAppointment = false;
  isWarning = false;
  isEdited = false;
  showClientField = false;
  modalHeader = '';
  appoitmentForm = new FormGroup({
    type: new FormControl(''),
    subject: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    client: new FormControl(''),
  });
  timeOptions: TimeOption[] = [];
  clients = {} as Clients;
  displayTime = '';
  currentSelectedCient: ClientDetail | undefined;
  appointmentTypeEnumKeys: string[];
  appointmentTypeEnumKeysNumbers: number[] = [];
  preferredSubject = '';

  get changesMade() {
    const listOnControlsToCheck = [
      'subject',
      'date',
      'startTime',
      'endTime',
      'client',
    ];

    let isChanged = false;
    listOnControlsToCheck.forEach((key) => {
      let currentValue = this.appoitmentForm.controls[key].value;
      let previousValue =
        this.currentAppointment[key as keyof AppointmentDetail];

      if (key === 'date') {
        currentValue = new Date(currentValue);
        currentValue.setHours(0, 0, 0, 0);
        currentValue = currentValue.getTime();
        previousValue = new Date(previousValue as Date);
        previousValue.setHours(0, 0, 0, 0);
        previousValue = previousValue.getTime();
      }

      if (JSON.stringify(currentValue) !== JSON.stringify(previousValue)) {
        isChanged = true;
      }
    });
    return isChanged;
  }

  constructor(private cd: ChangeDetectorRef) {
    this.appointmentTypeEnumKeys = Object.keys(this.appointmentType).filter(
      (k) => !isNaN(Number(k))
    );
    this.appointmentTypeEnumKeys.forEach((n) => {
      this.appointmentTypeEnumKeysNumbers.push(parseInt(n));
    });
  }

  ngOnInit(): void {
    this.isNewAppointment = Object.keys(this.currentAppointment).length === 0;
    this.setTimeOptions();
    this.setScreen();
    this.setForm();
    this.getClientData();
  }

  // Main call to actions callbacks
  onSubmitClick() {
    if (this.isRemoveAppointment) {
      this.cancelAppointment.emit();
      return;
    }

    if (this.isNewAppointment) {
      this.appoitmentForm.controls['client'].setValue(
        this.currentSelectedCient
      );
      this.newAppointment.emit(this.appoitmentForm.value as AppointmentDetail);
    } else {
      this.isWarning = true;
    }
  }

  onEditAppointmentClick() {
    this.isEditable = true;
  }

  onCancelAppointmentClick() {
    this.isRemoveAppointment = true;
  }

  onCloseClick() {
    this.closed.emit();
  }

  onCancelEditsClick() {
    if (this.isNewAppointment) {
      this.closed.emit();
      return;
    }
    if (this.isEdited) {
      this.warningType = WarningType.EDIT_CANCEL;
      this.isWarning = true;
    } else {
      this.isEditable = false;
    }
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

  compareTypes(first: any, second: any) {
    return first == second;
  }

  isChangesMade() {
    let clientDetail = this.appoitmentForm.controls['client']
      .value as ClientDetail;
    if (this.isClientChanged(clientDetail) && clientDetail.displayName) {
      this.currentSelectedCient = clientDetail;
      this.appoitmentForm.controls['client'].setValue(clientDetail.displayName);
    }

    this.setPreferredSubject();

    this.showClientField =
      this.appoitmentForm.controls['type'].value === AppointmentType.Lesson;

    this.isEdited = this.changesMade;
    this.cd.detectChanges();
  }

  private isClientChanged(clientDetail: ClientDetail) {
    let previousValue = this.currentAppointment.client?.displayName
      ? this.currentAppointment.client.displayName
      : this.currentAppointment.client;

    let currentValue = clientDetail.displayName
      ? clientDetail.displayName
      : clientDetail;

    return currentValue != previousValue;
  }

  // Private functions related to initialisation of the component
  private setScreen() {
    if (this.isNewAppointment) {
      this.modalHeader = 'New appointment';
      return;
    }

    if (this.currentAppointment.subject) {
      this.modalHeader = this.currentAppointment.subject;
      return;
    }

    this.modalHeader = 'Edit appointment';
  }

  private setForm() {
    this.isEditable = this.isNewAppointment;
    this.isNewAppointment ? this.setFormForNew() : this.setFormForEdit();
    this.currentSelectedCient = this.currentAppointment.client;

    this.preferredSubject = this.isNewAppointment
      ? 'New appointment'
      : this.getPreferredSubject();

    this.showClientField =
      this.appoitmentForm.controls['type'].value === AppointmentType.Lesson;
  }

  private setFormForNew() {
    let endTime = this.determineEndTime(this.startTime);
    this.appoitmentForm = new FormGroup({
      type: new FormControl(''),
      subject: new FormControl('New appointment'),
      date: new FormControl(this.date),
      startTime: new FormControl({
        hours: this.startTime.hours,
        minutes: this.startTime.minutes,
      } as Time),
      endTime: new FormControl(endTime),
      client: new FormControl(''),
    });
    this.currentAppointment.invoice = 0;
  }

  private setFormForEdit() {
    this.appoitmentForm = new FormGroup({
      type: new FormControl(this.currentAppointment.type || 0),
      subject: new FormControl(this.currentAppointment.subject || ''),
      date: new FormControl(this.date || ''),
      startTime: new FormControl(this.currentAppointment.startTime),
      endTime: new FormControl(this.currentAppointment.endTime || ''),
      client: new FormControl(
        this.currentAppointment.client?.displayName || ''
      ),
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

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }

  private setPreferredSubject() {
    let isAutoUpdateSubject =
      this.appoitmentForm.controls['subject'].value === this.preferredSubject;

    this.preferredSubject = this.getPreferredSubject();

    if (isAutoUpdateSubject) {
      this.appoitmentForm.controls['subject'].setValue(this.preferredSubject);
    }
  }

  private getPreferredSubject(): string {
    let preferredSubject = '';
    if (this.appoitmentForm.controls['type'].value === AppointmentType.Lesson) {
      preferredSubject = 'Lesson';
    } else {
      preferredSubject = 'Appointment';
    }
    if (this.currentSelectedCient?.firstName) {
      preferredSubject =
        preferredSubject + ' with ' + this.currentSelectedCient.firstName;
    }
    return preferredSubject;
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

  // Warning Callbacks
  warningProceed() {
    this.isWarning = false;
    switch (this.warningType) {
      case WarningType.EDIT_SAVE: {
        this.appoitmentForm.controls['client'].setValue(
          this.currentSelectedCient
        );

        let newAppointmentDetails = this.appoitmentForm
          .value as AppointmentDetail;
        newAppointmentDetails.invoice = this.currentAppointment.invoice;
        this.editedAppointment.emit(newAppointmentDetails);
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.setForm();
        this.isEditable = false;
        return;
      }
    }
  }

  warningCancel() {
    this.isWarning = false;
  }
}
