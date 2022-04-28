export interface CreditNotes {
  [creditNoteID: number]: CreditNoteDetails;
}

export interface CreditNoteDetails {
  date: Date;
  appointment: number;
}
