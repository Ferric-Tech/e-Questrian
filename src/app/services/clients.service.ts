import { Injectable } from '@angular/core';
import { Client } from 'src/interfaces/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients: Client[] = [];

  constructor() {}

  editClient(oldClient: Client, newClient: Client) {
    let clientsList = localStorage.getItem('clients');
    this.clients = JSON.parse(clientsList || '[]');
    this.removeClient(oldClient);
    this.addClient(newClient);
  }

  removeClient(client: Client) {
    for (let index = 0; index < this.clients.length; index++) {
      if (JSON.stringify(this.clients[index]) === JSON.stringify(client)) {
        this.clients.splice(index, 1);
        break;
      }
    }
  }

  addClient(client: Client) {
    this.clients.push(client);
    localStorage.setItem('clients', JSON.stringify(this.clients));
  }
}
