import { Time } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AppointmentDetail,
  AppointmentType,
} from 'src/app/interfaces/appointments.interface';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import {
  WarningsComponent,
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
  @Input() proposedStartTime: Time = {} as Time;
  @Input() currentAppointment = {} as AppointmentDetail;
  @Output() closed = new EventEmitter<void>();
  @Output() newAppointment = new EventEmitter<AppointmentDetail>();
  @Output() editedAppointment = new EventEmitter<AppointmentDetail>();
  @Output() cancelAppointment = new EventEmitter<void>();

  @ViewChild(WarningsComponent, { static: false }) warningsComponent:
    | WarningsComponent
    | undefined;

  appointmentType = AppointmentType;
  warningType = WarningType.EDIT_SAVE;
  warningSubject = WarningSubjectType.APPOINTMENT;
  isEditable = false;
  isNewAppointment: boolean = true;
  isRemoveAppointment = false;
  isWarning = false;
  isSavable = false;
  isHeaderEditable = false;
  showClientField = false;
  modalHeader = '';
  appoitmentForm = new FormGroup({
    type: new FormControl(''),
    subject: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    duration: new FormControl(''),
    client: new FormControl(''),
  });
  startTimeOptions: TimeOption[] = [];
  durationTimeOptions: TimeOption[] = [];
  clients = {} as Clients;
  displayTime = '';
  currentSelectedCient: ClientDetail | undefined;
  appointmentTypeEnumKeys: string[] | undefined;
  appointmentTypeEnumKeysNumbers: number[] = [];
  preferredSubject = '';

  constructor(private cd: ChangeDetectorRef) {
    this.setEnumOptions();
  }

  ngOnInit(): void {
    this.isNewAppointment = Object.keys(this.currentAppointment).length === 0;
    this.setTimeOptions();
    this.setHeader();
    this.setForm();
    this.getClientData();
  }

  // Private functions related to initialisation of the component
  private setEnumOptions() {
    this.appointmentTypeEnumKeys = Object.keys(this.appointmentType).filter(
      (k) => !isNaN(Number(k))
    );
    this.appointmentTypeEnumKeys.forEach((n) => {
      this.appointmentTypeEnumKeysNumbers.push(parseInt(n));
    });
  }

  private setHeader() {
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
    this.appoitmentForm = new FormGroup({
      type: new FormControl(''),
      subject: new FormControl('New appointment'),
      date: new FormControl(this.date),
      startTime: new FormControl({
        hours: this.proposedStartTime.hours,
        minutes: this.proposedStartTime.minutes,
      } as Time),
      duration: new FormControl({ hours: 0, minutes: 30 }),
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
      duration: new FormControl(this.currentAppointment.duration || ''),
      client: new FormControl(
        this.currentAppointment.client?.displayName || ''
      ),
    });
  }

  private setTimeOptions() {
    this.setStartTimeOptions();
    this.setDurationTimeOptions();
  }

  private setStartTimeOptions() {
    for (let hour = 6; hour < 18; hour++) {
      let onHour = {
        value: { hours: hour, minutes: 0 } as Time,
        display: hour + ':00',
      };
      let onHalfHour = {
        value: { hours: hour, minutes: 30 } as Time,
        display: hour + ':30',
      };

      this.startTimeOptions.push(onHour, onHalfHour);
    }
  }

  private setDurationTimeOptions() {
    this.durationTimeOptions = [
      { display: '0:05', value: { hours: 0, minutes: 5 } },
      { display: '0:10', value: { hours: 0, minutes: 10 } },
      { display: '0:15', value: { hours: 0, minutes: 15 } },
      { display: '0:30', value: { hours: 0, minutes: 30 } },
      { display: '0:45', value: { hours: 0, minutes: 45 } },
      { display: '1:00', value: { hours: 1, minutes: 0 } },
      { display: '1:30', value: { hours: 1, minutes: 30 } },
      { display: '2:00', value: { hours: 2, minutes: 0 } },
      { display: '3:00', value: { hours: 3, minutes: 0 } },
      { display: '4:00', value: { hours: 4, minutes: 0 } },
      { display: '6:00', value: { hours: 6, minutes: 0 } },
      { display: '8:00', value: { hours: 8, minutes: 0 } },
    ];
  }

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }

  // Main call to actions callbacks
  onSubmitClick() {
    if (this.isRemoveAppointment) {
      this.cancelAppointment.emit();
      return;
    }

    if (this.isNewAppointment) {
      this.prepAndSaveNewAppointment();
      return;
    }

    this.warningType = WarningType.EDIT_SAVE;
    this.isWarning = true;
  }

  onEditAppointmentClick() {
    this.isSavable = false;
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
    if (this.isSavable) {
      this.warningType = WarningType.EDIT_CANCEL;
      this.isWarning = true;
    } else {
      this.isEditable = false;
    }
  }

  // Minor actions callbacks
  onHeaderEditClick() {
    this.isHeaderEditable = true;
  }

  onHeaderEditSubmitClick() {
    this.modalHeader = this.appoitmentForm.controls['subject'].value;
    this.isHeaderEditable = false;
  }

  onHeaderEditCancelClick() {
    this.isHeaderEditable = false;
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

  onChangesMade() {
    // Address client
    switch (this.appoitmentForm.controls['type'].value) {
      case AppointmentType.Lesson: {
        let clientDetail = this.appoitmentForm.controls['client']
          .value as ClientDetail;
        if (this.isClientChanged(clientDetail) && clientDetail.displayName) {
          this.currentSelectedCient = clientDetail;
          this.appoitmentForm.controls['client'].setValue(
            clientDetail.displayName
          );
        }
        break;
      }
      case AppointmentType.Other: {
        this.appoitmentForm.controls['client'].setValue('');
        this.currentSelectedCient = {} as ClientDetail;
      }
    }
    this.showClientField =
      this.appoitmentForm.controls['type'].value === AppointmentType.Lesson;

    // Address header
    this.onHeaderEditSubmitClick();
    this.setPreferredSubject();

    // Address form state
    if (this.isChangesMade()) {
      this.isSavable = this.isFormValid();
      this.cd.detectChanges();
    }
  }

  private isChangesMade(): boolean {
    const listOnControlsToCheck = [
      'subject',
      'date',
      'startTime',
      'duration',
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

  // Functions related to Warnings
  warningProceed(proceed: boolean) {
    this.isWarning = false;
    this.isEditable = false;

    if (!proceed) return;
    switch (this.warningType) {
      case WarningType.EDIT_SAVE: {
        this.prepAndSaveEditedAppointment();
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.setForm();
        return;
      }
    }
  }

  private prepAndSaveNewAppointment() {
    this.appoitmentForm.controls['client'].setValue(this.currentSelectedCient);
    this.newAppointment.emit(this.appoitmentForm.value as AppointmentDetail);
  }

  private prepAndSaveEditedAppointment() {
    this.appoitmentForm.controls['client'].setValue(this.currentSelectedCient);
    let newAppointmentDetails = this.appoitmentForm.value as AppointmentDetail;
    newAppointmentDetails.invoice = this.currentAppointment.invoice;
    this.editedAppointment.emit(newAppointmentDetails);
    this.appoitmentForm.controls['client'].setValue(
      this.currentSelectedCient?.displayName
    );
  }

  // Private functions for checking status of the form
  private isFormValid(): boolean {
    if (!this.appoitmentForm.controls['type'].value) {
      return false;
    }
    if (this.appoitmentForm.controls['type'].value === 1) {
      if (!this.appoitmentForm.controls['client'].value) {
        return false;
      }
    }
    if (!this.appoitmentForm.controls['date'].value) {
      return false;
    }
    if (!this.appoitmentForm.controls['subject'].value) {
      return false;
    }
    return true;
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

  // Functions related to the auto completion of the appointment subject
  private setPreferredSubject() {
    let isAutoUpdateSubject =
      this.appoitmentForm.controls['subject'].value === this.preferredSubject;

    this.preferredSubject = this.getPreferredSubject();

    if (isAutoUpdateSubject) {
      this.appoitmentForm.controls['subject'].setValue(this.preferredSubject);
      this.modalHeader = this.preferredSubject;
    }
  }

  private getPreferredSubject(): string {
    let preferredSubject = '';
    switch (this.appoitmentForm.controls['type'].value) {
      case AppointmentType.Lesson: {
        preferredSubject = 'Lesson';
        if (this.currentSelectedCient?.firstName) {
          preferredSubject =
            preferredSubject + ' with ' + this.currentSelectedCient.firstName;
        }
        break;
      }
      case AppointmentType.Other: {
        preferredSubject = 'Appointment';
        break;
      }
    }
    return preferredSubject;
  }
}
