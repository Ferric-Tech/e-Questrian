import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';
import {
  GeneralItem,
  GeneralItemsListPageConfig,
  MenuPageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

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
  selector: 'app-clients-page',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  clientMenuPageConfig = {
    header: '',
    subHeader: 'Clients Menu',
    menu: [
      { display: 'View clients', viewState: ViewState.VIEW },
      { display: 'Add new client', viewState: ViewState.ADD_EDIT },
    ],
  } as MenuPageConfig;

  clientListPageConfig = {
    header: '',
    subHeader: 'Clients',
    columns: [
      { content: 'Client', widthFactor: 3 },
      { content: 'Email', widthFactor: 5 },
      { content: 'Contact', widthFactor: 3 },
    ],
    items: [],
  } as GeneralItemsListPageConfig;

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
    switch (this.currentViewState) {
      case ViewState.VIEW: {
        this.setClientList();
      }
    }
  }

  backToClientMain() {
    this.currentViewState = ViewState.MAIN;
  }

  closeClientModal() {
    this.currentViewState = ViewState.VIEW;
  }

  viewClient(clientID: number) {
    this.setClients();
    this.currentClient = this.clients[clientID];
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

  private setClientList() {
    this.setClients();
    Object.keys(this.clients).forEach((key) => {
      this.clientListPageConfig.items[parseInt(key)] = [
        { content: this.clients[parseInt(key)].displayName },
        { content: this.clients[parseInt(key)].email },
        { content: this.clients[parseInt(key)].telephoneNumber },
      ];
    });
  }
}
