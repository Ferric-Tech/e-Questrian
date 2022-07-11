export interface Invoices {
  [invoiceID: number]: InvoiceDetails;
}

export interface InvoiceDetails {
  clientID: number;
  date: Date;
  appointments: number[];
}
