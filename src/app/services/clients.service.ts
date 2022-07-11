import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDetail, Clients } from 'src/app/interfaces/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients = {} as Clients;

  editClient(oldClient: ClientDetail, newClient: ClientDetail) {
    this.getClientData();
    this.removeClient(oldClient);
    this.addClient(newClient);
  }

  removeClient(client: ClientDetail) {
    const numberOfClients = Object.keys(this.clients).length;
    for (let clientID = 1; clientID < numberOfClients + 1; clientID++) {
      if (JSON.stringify(this.clients[clientID]) === JSON.stringify(client)) {
        delete this.clients[clientID];
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
