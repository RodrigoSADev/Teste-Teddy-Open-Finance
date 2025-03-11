import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clientes-list-clients',
  imports: [],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientsService = inject(ClientsService);

  clients = signal<Client[]>([]);

  ngOnInit(): void {
    this.clientsService.getClients(1, 10).subscribe({
      next: (response) => {
        this.clients.set(response.clients);
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
