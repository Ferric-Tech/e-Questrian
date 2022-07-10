import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import { MenuPageConfig } from 'src/app/interfaces/common-page-configs.interface';

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
  clientMenuPageConfig = {
    header: '',
    subHeader: 'Clients Menu',
    menu: [
      { display: 'View clients', viewState: ViewState.VIEW },
      { display: 'Add new client', viewState: ViewState.ADD_EDIT },
    ],
  } as MenuPageConfig;

  viewClientsMenuConfig = {
    header: '',
    subHeader: '',
    menu: [{ display: 'Back to Client Menu', viewState: ViewState.MAIN }],
  } as MenuPageConfig;

  viewStateEnum = ViewState;
  currentViewState = ViewState.MAIN;
  clients = {} as Clients;
  currentClient: ClientDetail = {} as ClientDetail;

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.setClients();
  }

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
  }

  backToClientMain() {
    this.currentViewState = ViewState.MAIN;
  }

  closeClientModal() {
    this.currentViewState = ViewState.VIEW;
  }

  viewClient(client: ClientDetail) {
    this.setClients();
    this.currentClient = client;
    this.currentViewState = ViewState.ADD_EDIT;
  }

  addNewClient(client: ClientDetail) {
    this.clientService.addClient(client);
    this.setClients();
  }

  editClient(newClient: ClientDetail) {
    this.clientService.editClient(this.currentClient, newClient);
    this.setClients();
  }

  private setClients() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
  }
}
