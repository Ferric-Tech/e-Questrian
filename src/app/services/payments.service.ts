import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PaymentDetails, Payments } from '../interfaces/payments.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  payments = {} as Payments;

  addPayment(payment: PaymentDetails) {
    this.getPaymentData();
    const NewPaymentID = Object.keys(this.payments).length + 1;
    this.payments[NewPaymentID] = payment;
    localStorage.setItem('payments', JSON.stringify(this.payments));
  }

  private getPaymentData() {
    let paymentString = localStorage.getItem('payments');
    this.payments = JSON.parse(paymentString || '{}');
  }
}
