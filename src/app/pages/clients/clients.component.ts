import { Component, OnInit } from '@angular/core';
import { Client } from 'src/interfaces/clients.interface';

export enum ViewState {
  MAIN,
  VIEW,
  ADD_EDIT,
}

export interface MenuOption {
  display: string;
  viewState: ViewState;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  readonly menuOptions: MenuOption[] = [
    { display: 'View clients', viewState: ViewState.VIEW },
    { display: 'Add new client', viewState: ViewState.ADD_EDIT },
  ];

  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  clients: Client[] = [];
  currentClient: Client = {} as Client;

  constructor() {}

  ngOnInit(): void {
    this.setClients();
  }

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
  }

  backToClientMain() {
    this.currentViewState = ViewState.MAIN;
  }

  cancelAddEditClient() {
    this.currentViewState = ViewState.VIEW;
  }

  addNewClient(client: Client) {
    this.clients.push(client);
    localStorage.setItem('clients', JSON.stringify(this.clients));
    this.currentViewState = ViewState.VIEW;
  }

  private setClients() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
  }
}
