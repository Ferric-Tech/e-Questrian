import { Component } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Appointments } from 'src/app/interfaces/appointments.interface';
import { Invoices } from 'src/app/interfaces/invoices.interface';

export enum ViewState {
  MAIN,
  VIEW_INVOICES,
  INVOICE_DETAIL,
  VIEW_STATEMENTS,
  GENERATE_INVOICES,
  PAYMENTS,
  RECORD_PAYMENT,
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
    { display: 'RecordPayment', viewState: ViewState.RECORD_PAYMENT },
    { display: 'View Payments', viewState: ViewState.VIEW_PAYMENTS },
  ];

  appointments: Appointments = {};
  invoices = {} as Invoices;
  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  currentInvoiceID = 0;
  isInvoiceGenerationComplete = true;

  constructor(private invoiceService: InvoicesService) {}

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
    switch (this.currentViewState) {
      case ViewState.VIEW_INVOICES:
        this.getDataForDisplay();
        break;
      case ViewState.GENERATE_INVOICES:
        this.generateInvoices();
        break;
    }
  }

  viewInvoice(invoiceIDStr: string) {
    const invoiceID = parseInt(invoiceIDStr);
    this.currentViewState = ViewState.INVOICE_DETAIL;
    this.currentInvoiceID = invoiceID;
  }

  backToFinancetMain() {
    this.currentViewState = ViewState.MAIN;
  }

  backToInvoiceList() {
    this.getDataForDisplay();
    this.currentViewState = ViewState.VIEW_INVOICES;
  }

  paymentDetailModalClosed() {
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

  private generateInvoices() {
    this.isInvoiceGenerationComplete = false;
    this.invoiceService.generateInvoices();
    this.isInvoiceGenerationComplete = true;
  }
}
