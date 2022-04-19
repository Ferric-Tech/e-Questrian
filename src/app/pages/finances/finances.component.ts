import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/services/test-data.service';
import { Invoice } from 'src/interfaces/invoices.interface';

export interface InvoiceForDisplay extends Invoice {
  displayName: string;
}

export enum ViewState {
  MAIN,
  VIEW_INVOICES,
  INVOICE_DETAIL,
  VIEW_STATEMENTS,
  GENERATE_INVOICES,
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
export class FinancesComponent implements OnInit {
  readonly menuOptions: MenuOption[] = [
    { display: 'View Invoices', viewState: ViewState.VIEW_INVOICES },
    { display: 'View Statements', viewState: ViewState.VIEW_STATEMENTS },
    { display: 'Generate invoices', viewState: ViewState.GENERATE_INVOICES },
  ];

  invoices: InvoiceForDisplay[] = [];
  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  currentInvoice: InvoiceForDisplay = {} as InvoiceForDisplay;
  isInvoiceGenerationComplete = true;

  constructor(private testDataService: TestDataService) {}

  ngOnInit(): void {
    this.setInvoices();
  }

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
    if (this.currentViewState == ViewState.GENERATE_INVOICES) {
      this.generateInvoices();
    }
  }

  viewInvoice(invoice: InvoiceForDisplay) {
    this.currentViewState = ViewState.INVOICE_DETAIL;
    this.currentInvoice = invoice;
  }

  backToFinancetMain() {
    this.currentViewState = ViewState.MAIN;
  }

  backToInvoiceList() {
    this.setInvoices();
    this.currentViewState = ViewState.VIEW_INVOICES;
  }

  private setInvoices() {
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
    this.invoices.forEach((invoice, index) => {
      this.invoices[index].displayName =
        this.invoices[index].client.displayName;
    });
  }

  private generateInvoices() {
    this.isInvoiceGenerationComplete = false;
    this.testDataService.generateInvoices();
    this.isInvoiceGenerationComplete = true;
  }
}
