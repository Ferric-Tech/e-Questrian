import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { DateRange } from '../generate-invoice/generate-invoice.modal';

export interface GenerateStatementParameters {
  client: ClientDetail;
  startDate: Date;
  endDate: Date;
}

export enum StatementDateRangeSelector {
  THIS_MONTH,
  MONTH_TO_DATE,
  CUSTOM,
}

export interface StatementDateRangeOption {
  display: string;
  value: StatementDateRange;
}

export interface StatementDateRange {
  selector: StatementDateRangeSelector;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-generate-statement-modal',
  templateUrl: './generate-statement.modal.html',
  styleUrls: ['./generate-statement.modal.scss'],
})
export class GenerateStatementModal implements OnInit {
  @Output() generateStatementParameters =
    new EventEmitter<GenerateStatementParameters>();
  @Output() cancelled = new EventEmitter<void>();

  clients = {} as Clients;
  statementDateRangeSelector = StatementDateRangeSelector;

  selectedClient = {} as ClientDetail;
  dateRangeOptions = [] as StatementDateRangeOption[];
  selectedDateRange = {} as StatementDateRange;
  startDate = new Date();
  endDate = new Date();

  generateStatementParametersForm = new FormGroup({
    client: new FormControl(''),
    dateRange: new FormControl(1),
    startDate: new FormControl(this.startDate),
    endDate: new FormControl(this.endDate),
  });

  isGenerate = false;

  ngOnInit(): void {
    this.getClientData();
    this.setDateRangeOptions();
  }

  // Button callbacks
  onSubmitClick() {
    if (this.isGenerate) {
      let params = {} as GenerateStatementParameters;
      params.client = this.selectedClient;
      params.startDate = this.startDate;
      params.endDate = this.endDate;
      this.generateStatementParameters.emit(params);
      return;
    }
    this.cancelled.emit();
  }

  onGenerateStatementClick() {
    this.isGenerate = true;
  }

  // Field callbacks
  onClientSelected() {
    this.selectedClient =
      this.generateStatementParametersForm.controls['client'].value;
  }

  onDateRangeSelected() {
    this.selectedDateRange =
      this.generateStatementParametersForm.controls['dateRange'].value;
    this.startDate = this.selectedDateRange.startDate;
    this.endDate = this.selectedDateRange.endDate;
    this.generateStatementParametersForm.controls['startDate'].setValue(
      this.startDate
    );
    this.generateStatementParametersForm.controls['endDate'].setValue(
      this.endDate
    );
  }

  onStartDateChange() {
    this.startDate =
      this.generateStatementParametersForm.controls['startDate'].value;
  }

  onEndDateChange() {
    this.endDate =
      this.generateStatementParametersForm.controls['endDate'].value;
  }

  // Call backs to set options
  compareClients(client: ClientDetail, displayName: string) {
    return client.displayName == displayName;
  }

  private getClientData() {
    let clientList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientList || '[]');
  }

  private setDateRangeOptions() {
    const today = new Date();
    const yesterday =
      today.getDate() === 1
        ? new Date(today.getFullYear(), today.getMonth(), 0)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    this.dateRangeOptions.push(
      {
        display: 'This month',
        value: {
          selector: StatementDateRangeSelector.THIS_MONTH,
          startDate: firstDayOfMonth,
          endDate: lastDayOfMonth,
        },
      },
      {
        display: 'Month to date',
        value: {
          selector: StatementDateRangeSelector.MONTH_TO_DATE,
          startDate: today,
          endDate: lastDayOfMonth,
        },
      },
      {
        display: 'Custom date range',
        value: {
          selector: StatementDateRangeSelector.CUSTOM,
          startDate: yesterday,
          endDate: today,
        },
      }
    );
  }
}
