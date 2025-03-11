import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { SelectedClientsService } from '../../services/selected-clients.service';

@Component({
  selector: 'app-clientes-selected-clients',
  imports: [CurrencyPipe],
  templateUrl: './selected-clients.component.html',
  styleUrl: './selected-clients.component.scss',
})
export class SelectedClientsComponent implements OnInit {
  selectedClientsService = inject(SelectedClientsService);
  selectedClients = signal<Client[]>([]);

  ngOnInit(): void {
    this.selectedClients.set(this.selectedClientsService.getSelectedClients());
  }

  toggleSelectClient(client: Client): void {
    const selectedClients = this.selectedClients();
    const index = selectedClients.findIndex((c) => c.id === client.id);

    if (index !== -1) {
      selectedClients.splice(index, 1);
    }

    this.selectedClients.set(selectedClients);
    this.selectedClientsService.setSelectedClients(selectedClients);
  }

  clearSelectedClients(): void {
    this.selectedClients.set([]);
    this.selectedClientsService.setSelectedClients([]);
  }
}
