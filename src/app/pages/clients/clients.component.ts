import { Component, OnInit } from '@angular/core';

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
  clients: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setClients();
  }

  onMenuOptionClicked(viewStateSelected: ViewState) {
    this.currentViewState = viewStateSelected;
  }

  private setClients() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
  }
}
