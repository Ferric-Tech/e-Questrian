import { Component } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  PaymentDetails,
  Payments,
} from 'src/app/interfaces/payments.interface';
import { PaymentsService } from 'src/app/services/payments.service';

export enum ViewState {
  MAIN,
  VIEW_INVOICES,
  INVOICE_DETAIL,
  VIEW_STATEMENTS,
  GENERATE_INVOICES,
  PAYMENTS,
  PAYMENT_DETAIL,
  VIEW_PAYMENTS,
}

export interface MenuOption {
  display: string;
  viewState: ViewState;
}
@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss'],
})
export class FinancesComponent {
  readonly menuOptions: MenuOption[] = [
    { display: 'View Invoices', viewState: ViewState.VIEW_INVOICES },
    { display: 'View Statements', viewState: ViewState.VIEW_STATEMENTS },
    { display: 'Generate invoices', viewState: ViewState.GENERATE_INVOICES },
    { display: 'Payments', viewState: ViewState.PAYMENTS },
  ];

  readonly paymentMenuOptions: MenuOption[] = [
    { display: 'RecordPayment', viewState: ViewState.PAYMENT_DETAIL },
    { display: 'View Payments', viewState: ViewState.VIEW_PAYMENTS },
  ];

  appointments: Appointments = {};
  invoices = {} as Invoices;
  payments = {} as Payments;
  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  currentInvoiceID = 0;
  currentPaymentID = 0;
  isInvoiceGenerationComplete = true;

  constructor(
    private invoiceService: InvoicesService,
    private paymentsService: PaymentsService
  ) {}

  onMenuOptionClicked(viewStateSelected: ViewState) {
    switch (viewStateSelected) {
      case ViewState.VIEW_INVOICES:
        this.getDataForDisplay();
        break;
      case ViewState.GENERATE_INVOICES:
        this.generateInvoices();
        break;
      case ViewState.VIEW_PAYMENTS:
        this.getPaymentData();
        break;
    }
    this.currentViewState = viewStateSelected;
  }

  viewInvoice(invoiceIDStr: string) {
    this.currentInvoiceID = parseInt(invoiceIDStr);
    this.currentViewState = ViewState.INVOICE_DETAIL;
  }

  viewPayment(PaymentIDStr: string) {
    this.currentPaymentID = parseInt(PaymentIDStr);
    this.currentViewState = ViewState.PAYMENT_DETAIL;
  }

  backToFinancetMain() {
    this.currentViewState = ViewState.MAIN;
  }

  backToPaymentMenu() {
    this.currentViewState = ViewState.PAYMENTS;
  }

  backToInvoiceList() {
    this.getDataForDisplay();
    this.currentViewState = ViewState.VIEW_INVOICES;
  }

  paymentDetailModalClosed() {
    this.currentViewState = ViewState.PAYMENTS;
  }

  paymentCreated(payment: PaymentDetails) {
    this.paymentsService.addPayment(payment);
    this.currentViewState = ViewState.PAYMENTS;
  }

  paymentEdited() {
    this.currentViewState = ViewState.PAYMENTS;
  }

  paymentVoided() {
    this.currentViewState = ViewState.PAYMENTS;
  }

  private getDataForDisplay() {
    this.getInvoiceData();
    this.getAppointmentData();
  }

  private getInvoiceData() {
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
  }

  private getAppointmentData() {
    let appointmentString = localStorage.getItem('appointments');
    this.appointments = JSON.parse(appointmentString || '{}');
  }

  private getPaymentData() {
    let paymentString = localStorage.getItem('payments');
    this.payments = JSON.parse(paymentString || '{}');
  }

  private generateInvoices() {
    this.isInvoiceGenerationComplete = false;
    this.invoiceService.generateInvoices();
    this.isInvoiceGenerationComplete = true;
  }
}
