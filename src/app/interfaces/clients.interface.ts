export interface Clients {
  [cientID: string]: ClientDetail;
}

export interface ClientDetail {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
}
