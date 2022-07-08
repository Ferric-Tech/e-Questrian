import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDetail } from 'src/app/interfaces/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients: ClientDetail[] = [];

  editClient(oldClient: ClientDetail, newClient: ClientDetail) {
    this.getClientData();
    this.removeClient(oldClient);
    this.addClient(newClient);
  }

  removeClient(client: ClientDetail) {
    for (let index = 0; index < this.clients.length; index++) {
      if (JSON.stringify(this.clients[index]) === JSON.stringify(client)) {
        this.clients.splice(index, 1);
        break;
      }
    }
  }

  addClient(clientDetail: ClientDetail) {
    this.getClientData();
    let clientID = Object.keys(this.clients).length + 1;
    this.clients[clientID] = clientDetail;
    this.setClientData();
  }

  private getClientData() {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '{}');
  }

  private setClientData() {
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }
}
