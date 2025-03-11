import { Injectable, signal } from '@angular/core';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedClientsService {
  selectedClients = signal<Client[]>([]);

  getSelectedClients(): Client[] {
    return this.selectedClients();
  }

  setSelectedClients(clients: Client[]): void {
    this.selectedClients.set(clients);
  }
}
