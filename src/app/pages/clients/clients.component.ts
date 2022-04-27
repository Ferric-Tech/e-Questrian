import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientDetail, Clients } from 'src/interfaces/clients.interface';

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

  cancelAddEditClient() {
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
    this.currentViewState = ViewState.VIEW;
  }

  editClient(newClient: ClientDetail) {
    this.clientService.editClient(this.currentClient, newClient);
    this.setClients();
    this.currentViewState = ViewState.VIEW;
  }

  private setClients() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
  }
}
