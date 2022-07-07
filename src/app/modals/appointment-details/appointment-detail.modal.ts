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
  @Input() startTime: Time = {} as Time;
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
    endTime: new FormControl(''),
    client: new FormControl(''),
  });
  private endTime: Time | undefined;
  startTimeOptions: TimeOption[] = [];
  endTimeOptions: TimeOption[] = [];
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
    this.setTimeOptions(this.startTime);
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
      this.isAppointmentDurationOver2Hours()
        ? this.presentExcessiveMeetingDuraionWarning()
        : this.prepAndSaveNewAppointment();
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

  onTimeSelected() {
    let startTime = this.appoitmentForm.controls['startTime'].value;
    this.setTimeOptions(startTime);
    this.onChangesMade();
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
    this.onHeaderEditSubmitClick();

    let clientDetail = this.appoitmentForm.controls['client']
      .value as ClientDetail;
    if (this.isClientChanged(clientDetail) && clientDetail.displayName) {
      this.currentSelectedCient = clientDetail;
      this.appoitmentForm.controls['client'].setValue(clientDetail.displayName);
    }

    this.setPreferredSubject();

    this.showClientField =
      this.appoitmentForm.controls['type'].value === AppointmentType.Lesson;

    if (this.changesMade) {
      this.isSavable = this.isFormValid();
      this.cd.detectChanges();
    }
  }

  // Functions related to Warnings
  warningProceed() {
    switch (this.warningType) {
      case WarningType.EDIT_SAVE: {
        if (this.isAppointmentDurationOver2Hours()) {
          this.warningType = WarningType.TIME_EXCESSIVE;
          this.warningsComponent?.presentFollowUp(this.warningType);
        } else {
          this.isWarning = false;
          this.isEditable = false;
          this.prepAndSaveEditedAppointment();
        }
        return;
      }
      case WarningType.EDIT_CANCEL: {
        this.isWarning = false;
        this.isEditable = false;
        this.setForm();
        return;
      }
      case WarningType.TIME_EXCESSIVE: {
        this.isWarning = false;
        this.isEditable = false;
        this.isNewAppointment
          ? this.prepAndSaveNewAppointment()
          : this.prepAndSaveEditedAppointment();
        return;
      }
    }
  }

  warningCancel() {
    this.isWarning = false;
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
  }

  private presentExcessiveMeetingDuraionWarning() {
    this.warningType = WarningType.TIME_EXCESSIVE;
    this.isWarning = true;
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

  isAppointmentDurationOver2Hours() {
    let startTime: Time = this.appoitmentForm.controls['startTime'].value;
    let endTime: Time = this.appoitmentForm.controls['endTime'].value;
    if (endTime.hours - startTime.hours > 2) {
      return true;
    }
    if (endTime.hours - startTime.hours === 2) {
      if (endTime.minutes - startTime.minutes > 0) {
        return true;
      }
    }
    return false;
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
    this.appoitmentForm = new FormGroup({
      type: new FormControl(''),
      subject: new FormControl('New appointment'),
      date: new FormControl(this.date),
      startTime: new FormControl({
        hours: this.startTime.hours,
        minutes: this.startTime.minutes,
      } as Time),
      endTime: new FormControl(this.endTime),
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

  private setTimeOptions(startTime: Time) {
    this.startTimeOptions = [];
    this.endTimeOptions = [];
    for (let hour = 6; hour < 18; hour++) {
      this.pushTimeToOptions(hour);
    }

    this.endTime = !this.endTime
      ? this.determineEndTime(this.startTime)
      : (this.appoitmentForm.controls['endTime'].value as Time);

    console.log(startTime);
    console.log(this.endTime);
    this.trimTimeOptions(startTime, this.endTime);
  }

  private pushTimeToOptions(hour: number) {
    let onHour = {
      value: { hours: hour, minutes: 0 } as Time,
      display: hour + ':00',
    };
    let onHalfHour = {
      value: { hours: hour, minutes: 30 } as Time,
      display: hour + ':30',
    };

    this.startTimeOptions.push(onHour, onHalfHour);
    this.endTimeOptions.push(onHour, onHalfHour);
  }

  private trimTimeOptions(startTime: Time, endTime: Time) {
    this.trimStartTime(endTime);
    this.trimEndTime(startTime);
  }

  private trimStartTime(currentSelectedTime: Time) {
    let indexToDelete = 0;
    this.startTimeOptions.forEach((option, index) => {
      if (indexToDelete === 0) {
        if (
          option.value.hours === currentSelectedTime.hours &&
          option.value.minutes === currentSelectedTime.minutes
        ) {
          indexToDelete = index;
          return;
        }
      }
    });
    do {
      this.startTimeOptions.splice(indexToDelete, 1);
    } while (this.startTimeOptions.length > indexToDelete);
  }

  private trimEndTime(currentSelectedTime: Time) {
    do {
      this.endTimeOptions.splice(0, 1);
    } while (
      !(
        this.endTimeOptions[0].value.hours === currentSelectedTime.hours &&
        this.endTimeOptions[0].value.minutes === currentSelectedTime.minutes
      )
    );
    this.endTimeOptions.splice(0, 1);
  }

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
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
}
