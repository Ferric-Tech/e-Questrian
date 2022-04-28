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
  @Output() deletePayment = new EventEmitter<void>();

  paymentForm = new FormGroup({
    client: new FormControl(''),
    amount: new FormControl(''),
    paymentType: new FormControl(''),
    date: new FormControl(new Date()),
  });

  isNewPayment = true;
  isDeletePayment = false;
  clients = {} as Clients;

  ngOnInit(): void {
    this.isNewPayment = Object.keys(this.currentPayment).length === 0;
    this.getClientData();
    this.setForm();
  }

  onSubmitClick() {
    this.isDeletePayment
      ? this.deletePayment.emit()
      : this.isNewPayment
      ? this.newPayment.emit(this.paymentForm.value as PaymentDetails)
      : this.editedPayment.emit(this.paymentForm.value as PaymentDetails);
  }
  onCloseClick() {
    this.closed.emit();
  }

  onCancelAppointmentClick() {
    this.isDeletePayment = true;
  }

  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }

  private setForm() {
    if (this.isNewPayment) {
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
