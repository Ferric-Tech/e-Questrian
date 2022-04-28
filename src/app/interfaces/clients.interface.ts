export interface Clients {
  [cientID: number]: ClientDetail;
}

export interface ClientDetail {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
}
