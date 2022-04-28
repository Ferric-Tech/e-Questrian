import { PaymentType } from '../enums/payments.enum';

export interface Payments {
  [invoiceID: number]: PaymentDetails;
}

export interface PaymentDetails {
  date: Date;
  client: number;
  type: PaymentType;
  amount: Number;
}
