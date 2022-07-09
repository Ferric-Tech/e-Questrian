import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';

export enum InvoiceRange {
  NONE,
  ALL,
  CUSTOM,
}

export enum DateRange {
  NONE,
  ALL,
  LIMITED,
}

export enum ClientRange {
  NONE,
  ALL,
  SINGLE,
  MULTI,
}

export interface GenerateInvoiceParameters {
  invoiceRange: InvoiceRange;
  dateRange: DateRange;
  clientSelector: ClientRange;
  date: Date;
  clients: Clients[];
}

@Component({
  selector: 'app-generate-invoice-modal',
  templateUrl: './generate-invoice.modal.html',
  styleUrls: ['./generate-invoice.modal.scss'],
})
export class GenerateInvoiceModal implements OnInit {
  @Output() generateInvoiceParameters =
    new EventEmitter<GenerateInvoiceParameters>();
  @Output() cancelled = new EventEmitter<void>();

  clientSelectorType = ClientRange;
  clients = {} as Clients;

  invoiceRange = InvoiceRange.NONE;
  dateRange = DateRange.NONE;
  clientRange = ClientRange.NONE;
  selectedDate = new Date();
  selectedClients = [] as Clients[];

  generateInvoicesParametersForm = new FormGroup({
    invoiceRange: new FormControl(1),
    dateRange: new FormControl(1),
    clientRange: new FormControl(0),
    date: new FormControl(this.selectedDate),
    clients: new FormControl(''),
  });

  isGenerate = false;

  ngOnInit(): void {
    this.getClientData();
  }

  // Button callbacks
  onSubmitClick() {
    if (this.isGenerate) {
      let params = {} as GenerateInvoiceParameters;
      params.invoiceRange = this.invoiceRange;
      params.dateRange = this.dateRange;
      params.clientSelector = this.clientRange;
      params.date = this.selectedDate;
      params.clients = this.selectedClients;
      console.log(params);
      this.generateInvoiceParameters.emit(params);
    }
    this.cancelled.emit();
  }

  onGenerateInvoicesClick() {
    this.isGenerate = true;
  }

  // Field callbacks
  onInvoiceRangeRadioClick() {
    this.invoiceRange = parseInt(
      this.generateInvoicesParametersForm.controls['invoiceRange'].value
    );
    if (this.invoiceRange === InvoiceRange.ALL) {
      this.clientRange = ClientRange.NONE;
      this.dateRange = DateRange.NONE;
    }
  }

  onDateRangeRadioClick() {
    this.dateRange = parseInt(
      this.generateInvoicesParametersForm.controls['dateRange'].value
    );
  }

  onClientRangeClick() {
    this.clientRange = parseInt(
      this.generateInvoicesParametersForm.controls['clientRange'].value
    );
  }

  onClientSelected() {
    if (this.clientRange === ClientRange.SINGLE) {
      this.selectedClients = [
        this.generateInvoicesParametersForm.controls['clients'].value,
      ];
      return;
    }
    this.selectedClients =
      this.generateInvoicesParametersForm.controls['clients'].value;
  }

  onDateChange() {
    this.selectedDate =
      this.generateInvoicesParametersForm.controls['date'].value;
  }

  // Call backs to set options
  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }
}
