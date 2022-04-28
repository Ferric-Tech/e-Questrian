export interface Invoices {
  [invoiceID: number]: InvoiceDetails;
}

export interface InvoiceDetails {
  date: Date;
  appointments: number[];
}
