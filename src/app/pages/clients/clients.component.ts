import { Component, OnInit } from '@angular/core';
import { TestDataService } from 'src/app/services/test-data.service';
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

  constructor(private testDataService: TestDataService) {}

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

  viewClient(client: Client) {
    this.setClients();
    this.currentClient = client;
    this.currentViewState = ViewState.ADD_EDIT;
  }

  addNewClient(client: Client) {
    this.testDataService.addClient(client);
    this.setClients();
    this.currentViewState = ViewState.VIEW;
  }

  editClient(newClient: Client) {
    this.testDataService.editClient(this.currentClient, newClient);
    this.setClients();
    this.currentViewState = ViewState.VIEW;
  }

  private setClients() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
  }
}
