import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { PaymentDetails } from 'src/app/interfaces/payments.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @Input() currentPayment = {} as PaymentDetails;
  @Output() closed = new EventEmitter<void>();
  @Output() newPayment = new EventEmitter<PaymentDetails>();
  @Output() editedPayment = new EventEmitter<PaymentDetails>();
  @Output() voidPayment = new EventEmitter<void>();

  paymentForm = new FormGroup({
    date: new FormControl(new Date()),
    client: new FormControl(''),
    paymentType: new FormControl(''),
    amount: new FormControl(''),
  });

  isNewPayment = true;
  isDeletePayment = false;
  isSaveAndNew = false;

  clients = {} as Clients;

  ngOnInit(): void {
    this.isNewPayment = Object.keys(this.currentPayment).length === 0;
    this.getClientData();
    this.setForm();
  }

  onSubmitClick() {
    this.parseKeysToInt();

    if (this.isDeletePayment) {
      this.voidPayment.emit();
      return;
    }

    this.isNewPayment
      ? this.newPayment.emit(this.paymentForm.value as PaymentDetails)
      : this.editedPayment.emit(this.paymentForm.value as PaymentDetails);

    this.isSaveAndNew ? this.ngOnInit() : this.closed.emit();
  }

  onSaveClick(saveAndNew: boolean) {
    this.isSaveAndNew = saveAndNew;
  }

  onCloseClick() {
    this.closed.emit();
  }

  onCancelAppointmentClick() {
    this.isDeletePayment = true;
  }

  compareClients(clientDetails: any, displayName: string) {
    return clientDetails.value.displayName == displayName;
  }

  private parseKeysToInt() {
    this.paymentForm.controls['client'].setValue(
      parseInt(this.paymentForm.controls['client'].value.key)
    );
    this.paymentForm.controls['amount'].setValue(
      parseInt(this.paymentForm.controls['amount'].value)
    );
  }

  private setForm() {
    if (this.isNewPayment) {
      this.paymentForm.controls['amount'].setValue('');
      return;
    }
    this.paymentForm = new FormGroup({
      client: new FormControl(
        this.clients[this.currentPayment.client].displayName
      ),
      amount: new FormControl(this.currentPayment.amount),
      paymentType: new FormControl(this.currentPayment.paymentType),
      date: new FormControl(this.currentPayment.date),
    });
  }

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
