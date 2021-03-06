import { Component } from '@angular/core';
import {
  GenerateInvoiceResult,
  InvoicesService,
} from 'src/app/services/invoices.service';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';
import {
  PaymentDetails,
  Payments,
} from 'src/app/interfaces/payments.interface';
import { PaymentsService } from 'src/app/services/payments.service';
import {
  DocView,
  FinancialDocItem,
  FinancialDocListPageConfig,
  FinancialDocType,
  MenuPageConfig,
  ProcessResultsPageConfig,
  ResultType,
} from 'src/app/interfaces/common-page-configs.interface';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { GenerateInvoiceParameters } from 'src/app/modals/generate-invoice/generate-invoice.modal';
import { GenerateStatementParameters } from 'src/app/modals/generate-statement/generate-statement.modal';
import { StatementsService } from 'src/app/services/statements.service';
import { ClientNotificationService } from 'src/app/services/client-notification.service';

export enum ViewState {
  MAIN,
  INVOICES,
  VIEW_INVOICES,
  INVOICE_DETAIL,
  GENERATE_INVOICES_PARAMETERS,
  GENERATE_INVOICES_RESULTS,
  PAYMENTS,
  PAYMENT_DETAIL,
  VIEW_PAYMENTS,
  GENERATE_STATEMENTS_PARAMETERS,
  VIEW_STATEMENT,
}

export interface MenuOption {
  display: string;
  viewState: ViewState;
}
@Component({
  selector: 'app-finances-page',
  templateUrl: './finances.page.html',
  styleUrls: ['./finances.page.scss'],
})
export class FinancesPage {
  financeMenuPageConfig = {
    header: '',
    subHeader: 'Finance Menu',
    menu: [
      { display: 'Invoices', viewState: ViewState.INVOICES },
      { display: 'Payments', viewState: ViewState.PAYMENTS },
      {
        display: 'Statements',
        viewState: ViewState.GENERATE_STATEMENTS_PARAMETERS,
      },
    ],
  } as MenuPageConfig;

  invoicesMenuPageConfig = {
    header: '',
    subHeader: 'Invoices Menu',
    menu: [
      { display: 'View Invoices', viewState: ViewState.VIEW_INVOICES },
      {
        display: 'Generate invoices',
        viewState: ViewState.GENERATE_INVOICES_PARAMETERS,
      },
      { display: 'Back to Finance Menu', viewState: ViewState.MAIN },
    ],
  } as MenuPageConfig;

  invoiceListPageConfig = {
    header: '',
    subHeader: 'Invoices',
    financialDocType: FinancialDocType.LIST,
    items: [],
  } as FinancialDocListPageConfig;

  invoiceListMenuConfig = {
    header: '',
    subHeader: '',
    menu: [{ display: 'Back to Finance Menu', viewState: ViewState.MAIN }],
  } as MenuPageConfig;

  generateInvoiceResultsPageConfig = {
    header: '',
    subHeader: 'Invoices generated',
    explainer: 'The results of the invoice generation are presented below',
    results: [],
  } as ProcessResultsPageConfig;

  generateInvoiceResultsMenuConfig = {
    header: '',
    subHeader: '',
    menu: [{ display: 'View invoices', viewState: ViewState.VIEW_INVOICES }],
  } as MenuPageConfig;

  paymentsMenuPageConfig = {
    header: '',
    subHeader: 'Payments Menu',
    menu: [
      { display: 'RecordPayment', viewState: ViewState.PAYMENT_DETAIL },
      { display: 'View Payments', viewState: ViewState.VIEW_PAYMENTS },
      { display: 'Back to Finance Menu', viewState: ViewState.MAIN },
    ],
  } as MenuPageConfig;

  paymentListPageConfig = {
    header: '',
    subHeader: 'Payments',
    financialDocType: FinancialDocType.LIST,
    items: [],
  } as FinancialDocListPageConfig;

  paymentListMenuConfig = {
    header: '',
    subHeader: '',
    menu: [{ display: 'Back to Payments Menu', viewState: ViewState.PAYMENTS }],
  } as MenuPageConfig;

  statementPageConfig = {
    header: '',
    subHeader: 'Statement',
    financialDocType: FinancialDocType.STATEMENT,
    items: [],
  } as FinancialDocListPageConfig;

  statementMenuConfig = {
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
  clients = {} as Clients;

  constructor(
    private invoiceService: InvoicesService,
    private paymentsService: PaymentsService,
    private statementService: StatementsService,
    private clientNotificationService: ClientNotificationService
  ) {}

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.switchViewState(viewStateSelected);
  }

  onInvoiceClicked(invoiceID: number) {
    this.currentInvoiceID = invoiceID;
    this.switchViewState(ViewState.INVOICE_DETAIL);
  }

  onPaymentClicked(paymentID: number) {
    this.currentPaymentID = paymentID;
    this.switchViewState(ViewState.PAYMENT_DETAIL);
  }

  onStatementClicked(document: number) {}

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
    this.clientNotificationService.sendPaymentReceipt(payment);
    this.paymentsService.addPayment(payment);
  }

  paymentEdited(payment: PaymentDetails) {
    payment.voided = false;
    this.paymentsService.editPayment(this.currentPaymentID, payment);
  }

  paymentVoided() {
    this.paymentsService.voidPayment(this.currentPaymentID);
    this.switchViewState(ViewState.VIEW_PAYMENTS);
  }

  generateInvoices(params: GenerateInvoiceParameters) {
    this.isInvoiceGenerationComplete = false;
    const results = this.invoiceService.generateInvoices(params);
    this.setInvoiceGenerationResultsForDisplay(results);
    this.isInvoiceGenerationComplete = true;
    this.switchViewState(ViewState.GENERATE_INVOICES_RESULTS);
  }

  generateStatement(params: GenerateStatementParameters) {
    this.statementPageConfig.items =
      this.statementService.generateStatement(params);
    this.switchViewState(ViewState.VIEW_STATEMENT);
  }

  private switchViewState(viewStateSelected: ViewState) {
    switch (viewStateSelected) {
      case ViewState.VIEW_INVOICES:
        this.setDataForDisplay();
        break;
      case ViewState.INVOICE_DETAIL:
        this.setInvoiceDocsForDisplay();
        break;
      case ViewState.VIEW_PAYMENTS:
        this.setPaymentDocsForDisplay();
        break;
      case ViewState.PAYMENTS:
        this.currentPaymentID = 0;
        break;
    }
    this.currentViewState = viewStateSelected;
  }

  private setDataForDisplay() {
    this.getDataForDisplay();
    this.invoiceListPageConfig.items = [];
    Object.keys(this.invoices).forEach((key) => {
      const number = parseInt(key);
      this.invoiceListPageConfig.items.push({
        number: number,
        date: this.invoices[number].date,
        detail: this.appointments[this.invoices[number].appointments[0]].client
          ?.displayName as string,
        amount: this.invoices[number].appointments.length * 250,
      });
    });
  }

  private setInvoiceDocsForDisplay() {
    this.getClients();
    this.invoices[this.currentInvoiceID];
    this.invoiceDocViewConfig.subHeader = 'Invoice #' + this.currentInvoiceID;
    this.invoiceDocViewConfig.docNumber = this.currentInvoiceID;
    let firstAppoinentNumber =
      this.invoices[this.currentInvoiceID].appointments[0];
    this.invoiceDocViewConfig.docClient = this.appointments[
      firstAppoinentNumber
    ].client as ClientDetail;
    this.invoiceDocViewConfig.lineItems = [{ Lessons: [] }];
    this.invoices[this.currentInvoiceID].appointments.forEach(
      (appointmentID) => {
        this.invoiceDocViewConfig.lineItems[0]['Lessons'].push({
          number: appointmentID,
          date: this.appointments[appointmentID].date,
          detail: this.appointments[appointmentID].subject,
          amount: 250,
        });
      }
    );
  }

  private setPaymentDocsForDisplay() {
    this.getPaymentData();
    this.getClients();
    this.currentPaymentID = 0;
    this.paymentListPageConfig.items = [];
    Object.keys(this.payments).forEach((key) => {
      let finDoc = {} as FinancialDocItem;
      finDoc.number = parseInt(key);
      finDoc.amount = this.payments[parseInt(key)].amount as number;
      finDoc.date = this.payments[parseInt(key)].date as Date;
      let clientNum = this.payments[parseInt(key)].client;
      finDoc.detail = this.clients[clientNum].displayName;
      this.paymentListPageConfig.items.push(finDoc);
    });
  }

  private getDataForDisplay() {
    this.getInvoiceData();
    this.getAppointmentData();
  }

  private setInvoiceGenerationResultsForDisplay(
    results: GenerateInvoiceResult
  ) {
    this.generateInvoiceResultsPageConfig.results = [];

    if (results.numberOfInvoices === 0) {
      this.generateInvoiceResultsPageConfig.subHeader = 'No Invoices Generated';
      this.generateInvoiceResultsPageConfig.explainer =
        'Based on the current appointments and invoices previously, \
        we were unable to find any further invoices possible to generate';
      return;
    }

    this.generateInvoiceResultsPageConfig.results.push(
      {
        description: 'Clients invoiced:',
        resultType: ResultType.LIST,
        result: results.clients,
      },
      {
        description: 'Number of invoices:',
        resultType: ResultType.NUMBER,
        result: results.numberOfInvoices,
      },
      {
        description: 'Total value of invoices:',
        resultType: ResultType.NUMBER,
        result: results.totalValue,
      },
      {
        description: 'Average value of invoices:',
        resultType: ResultType.NUMBER,
        result: results.averageValue,
      },
      {
        description: 'Largest invoice value:',
        resultType: ResultType.NUMBER,
        result: results.largestValue,
      },
      {
        description: 'Earliest appointment date invoice:',
        resultType: ResultType.DATE,
        result: results.startDate,
      },
      {
        description: 'Latest appointment date invoice:',
        resultType: ResultType.DATE,
        result: results.endDate,
      }
    );
  }

  // averageValue: 312.5
  // clients: Array(4)
  // 0: "Jill Henry"
  // 1: "Kenny Timson"
  // 2: "Nurse Ash"
  // 3: "Little Ash"
  // length: 4
  // [[Prototype]]: Array(0)
  // endDate: Mon Jul 11 2022 11:07:36 GMT+0200 (South Africa Standard Time)
  // [[Prototype]]: Object
  // largestValue: 500
  // numberOfInvoices: 4
  // startDate: Sun Jul 10 2022 11:07:36 GMT+0200 (South Africa Standard Time)
  // [[Prototype]]: Object
  // totalValue: 1250
  // [[Prototype]]: Object

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

  private getClients() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
