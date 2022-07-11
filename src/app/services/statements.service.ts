import { Injectable } from '@angular/core';
import { Clients } from '../interfaces/clients.interface';
import { FinancialDocItem } from '../interfaces/common-page-configs.interface';
import { Invoices } from '../interfaces/invoices.interface';
import { Payments } from '../interfaces/payments.interface';
import { GenerateStatementParameters } from '../modals/generate-statement/generate-statement.modal';

export interface StatementBasics {
  openingBalance: number;
  transactions: FinancialDocItem[];
  closingBalance: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatementsService {
  payments = {} as Payments;
  invoices = {} as Invoices;
  clients = {} as Clients;

  constructor() {}

  generateStatement(params: GenerateStatementParameters): FinancialDocItem[] {
    let statement: FinancialDocItem[] = [];
    let statementBasics: StatementBasics = {
      openingBalance: 0,
      transactions: [],
      closingBalance: 0,
    };
    let currentClientID = 0;

    this.getClientData();
    this.getPaymentData();
    this.getInvoiceData();

    // Get clientID of the client selected
    const numberOfClients = Object.keys(this.clients).length;
    for (let clientID = 1; clientID < numberOfClients + 1; clientID++) {
      if (this.clients[clientID].displayName === params.client.displayName) {
        currentClientID = clientID;
        break;
      }
    }

    // Add all invoices related to currentClientID
    Object.keys(this.invoices).forEach((key) => {
      if (this.invoices[parseInt(key)].clientID === currentClientID) {
        let invoice = this.invoices[parseInt(key)];
        const docToAdd: FinancialDocItem = {
          number: parseInt(key),
          date: new Date(invoice.date),
          detail: 'Invoice',
          amount: invoice.appointments.length * 250,
        };
        statementBasics.transactions.push(docToAdd);
      }
    });

    // Add all payments related to currentClientID
    Object.keys(this.payments).forEach((key) => {
      if (this.payments[parseInt(key)].client === currentClientID) {
        let payment = this.payments[parseInt(key)];
        const docToAdd: FinancialDocItem = {
          number: parseInt(key),
          date: new Date(payment.date),
          detail: 'Payment',
          amount: payment.amount as number,
        };
        statementBasics.transactions.push(docToAdd);
      }
    });

    // Remove transactions outside of the statement date range and
    // calculate opening and closing balances
    let allTransactions = statementBasics.transactions;
    statementBasics.transactions = [];
    allTransactions.forEach((transaction) => {
      if (transaction.date < params.startDate) {
        transaction.detail === 'Invoice'
          ? (statementBasics.openingBalance =
              statementBasics.openingBalance + transaction.amount)
          : (statementBasics.openingBalance =
              statementBasics.openingBalance - transaction.amount);
      } else if (transaction.date <= params.endDate) {
        transaction.detail === 'Invoice'
          ? (statementBasics.closingBalance =
              statementBasics.closingBalance + transaction.amount)
          : (statementBasics.closingBalance =
              statementBasics.closingBalance - transaction.amount);
        statementBasics.transactions.push(transaction);
      }
    });
    statementBasics.closingBalance =
      statementBasics.closingBalance + statementBasics.openingBalance;

    // Sort the transactions to be displayed by date
    statementBasics.transactions.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    // Add opening balance as first item in statement
    statement.push({
      number: 0,
      date: params.startDate,
      detail: 'Opening balance',
      amount: statementBasics.openingBalance,
    });

    // Add transaction for display to statement
    statementBasics.transactions.forEach((transaction) => {
      statement.push(transaction);
    });

    // Add closing balance as last item in statement
    statement.push({
      number: 0,
      date: params.endDate,
      detail: 'Closing balance',
      amount: statementBasics.closingBalance,
    });

    return statement;
  }

  private getPaymentData() {
    let paymentString = localStorage.getItem('payments');
    this.payments = JSON.parse(paymentString || '{}');
  }

  private getInvoiceData() {
    let invoiceList = localStorage.getItem('invoices');
    this.invoices = JSON.parse(invoiceList || '[]');
  }

  private getClientData() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '{}');
  }
}
