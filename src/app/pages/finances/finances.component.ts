import { Component } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  PaymentDetails,
  Payments,
} from 'src/app/interfaces/payments.interface';
import { PaymentsService } from 'src/app/services/payments.service';
import {
  DocView,
  FinancialDoc,
  FinancialDocListPageConfig,
  MenuPageConfig,
} from 'src/app/interfaces/common-page-configs.interface';
import { DocType } from 'src/app/enums/doc-types.enum';
import { ClientDetail } from 'src/app/interfaces/clients.interface';

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
  financeMenuPageConfig = {
    header: '',
    subHeader: 'Finance Menu',
    menu: [
      { display: 'View Invoices', viewState: ViewState.VIEW_INVOICES },
      { display: 'View Statements', viewState: ViewState.VIEW_STATEMENTS },
      { display: 'Generate invoices', viewState: ViewState.GENERATE_INVOICES },
      { display: 'Payments', viewState: ViewState.PAYMENTS },
    ],
  } as MenuPageConfig;

  paymentMenuPageConfig = {
    header: '',
    subHeader: 'Payments Menu',
    menu: [
      { display: 'RecordPayment', viewState: ViewState.PAYMENT_DETAIL },
      { display: 'View Payments', viewState: ViewState.VIEW_PAYMENTS },
    ],
  } as MenuPageConfig;

  invoiceListPageConfig = {
    header: '',
    subHeader: 'Invoices',
    list: [],
  } as FinancialDocListPageConfig;

  invoiceListMenuConfig = {
    header: '',
    subHeader: '',
    menu: [{ display: 'Back to Finance Menu', viewState: ViewState.MAIN }],
  } as MenuPageConfig;

  invoiceDocViewConfig = {} as DocView;

  appointments: Appointments = {};
  invoices = {} as Invoices;
  payments = {} as Payments;
  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  currentInvoiceID = 0;
  currentPaymentID = 0;
  isInvoiceGenerationComplete = true;
  clients = {} as ClientDetail;

  constructor(
    private invoiceService: InvoicesService,
    private paymentsService: PaymentsService
  ) {}

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.switchViewState(viewStateSelected);
  }

  onInvoiceClicked(invoiceID: number) {
    this.currentInvoiceID = invoiceID;
    this.switchViewState(ViewState.INVOICE_DETAIL);
  }

  viewPayment(PaymentIDStr: string) {
    this.currentPaymentID = parseInt(PaymentIDStr);
    this.switchViewState(ViewState.PAYMENT_DETAIL);
  }

  backToFinancetMain() {
    this.switchViewState(ViewState.MAIN);
  }

  backToPaymentMenu() {
    this.switchViewState(ViewState.PAYMENTS);
  }

  backToInvoiceList() {
    this.switchViewState(ViewState.VIEW_INVOICES);
  }

  paymentDetailModalClosed() {
    this.switchViewState(ViewState.PAYMENTS);
  }

  paymentCreated(payment: PaymentDetails) {
    this.paymentsService.addPayment(payment);
    this.switchViewState(ViewState.VIEW_PAYMENTS);
  }

  paymentEdited(payment: PaymentDetails) {
    payment.voided = false;
    this.paymentsService.editPayment(this.currentPaymentID, payment);
    this.switchViewState(ViewState.PAYMENTS);
  }

  paymentVoided() {
    this.paymentsService.voidPayment(this.currentPaymentID);
    this.switchViewState(ViewState.VIEW_PAYMENTS);
  }

  private switchViewState(viewStateSelected: ViewState) {
    switch (viewStateSelected) {
      case ViewState.VIEW_INVOICES:
        this.setDataForDisplay();
        break;
      case ViewState.INVOICE_DETAIL:
        this.setInvoiceDocForDisplay();
        break;
      case ViewState.GENERATE_INVOICES:
        this.generateInvoices();
        break;
      case ViewState.VIEW_PAYMENTS:
        this.getPaymentData();
        this.currentPaymentID = 0;
        break;
      case ViewState.PAYMENTS:
        this.currentPaymentID = 0;
        break;
    }
    this.currentViewState = viewStateSelected;
  }

  private setDataForDisplay() {
    this.getDataForDisplay();
    this.invoiceListPageConfig.list = [];
    Object.keys(this.invoices).forEach((key) => {
      const number = parseInt(key);
      this.invoiceListPageConfig.list.push({
        number: number,
        date: this.invoices[number].date,
        detail:
          this.appointments[this.invoices[number].appointments[0]].client
            .displayName,
        amount: this.invoices[number].appointments.length * 250,
      });
    });
  }

  private setInvoiceDocForDisplay() {
    this.getClients();
    this.invoices[this.currentInvoiceID];
    this.invoiceDocViewConfig.subHeader = 'Invoice #' + this.currentInvoiceID;
    this.invoiceDocViewConfig.docNumber = this.currentInvoiceID;
    let firstAppoinentNumber =
      this.invoices[this.currentInvoiceID].appointments[0];
    this.invoiceDocViewConfig.docClient =
      this.appointments[firstAppoinentNumber].client;
    this.invoiceDocViewConfig.lineItems = [{ Lessons: [] }];
    this.invoices[this.currentInvoiceID].appointments.forEach(
      (appointmentID) => {
        this.invoiceDocViewConfig.lineItems[0]['Lessons'].push({
          number: appointmentID,
          date: this.appointments[appointmentID].date,
          detail: this.appointments[appointmentID].title,
          amount: 250,
        });
      }
    );
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

  private getClients() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
