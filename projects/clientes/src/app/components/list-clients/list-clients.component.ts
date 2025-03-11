import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';

@Component({
  selector: 'app-clientes-list-clients',
  imports: [],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientsService = inject(ClientsService);
  dialog = inject(MatDialog);

  clients = signal<Client[]>([]);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients(1, 10).subscribe({
      next: (response) => {
        this.clients.set(response.clients);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onCreateClient(): void {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
      }
    });
  }
}
