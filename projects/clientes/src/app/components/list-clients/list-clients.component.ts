import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { SelectedClientsService } from '../../services/selected-clients.service';
import { CreateClientDialogComponent } from '../create-client-dialog/create-client-dialog.component';
import { DeleteClientDialogComponent } from '../delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from '../edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clientes-list-clients',
  imports: [CurrencyPipe],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientsService = inject(ClientsService);
  dialog = inject(MatDialog);
  selectedClientsService = inject(SelectedClientsService);

  clients = signal<Client[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  limit = 9;
  totalClients = signal<number>(0);
  selectedClients = signal<Client[]>([]);

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.selectedClients.set(this.selectedClientsService.getSelectedClients());
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients(this.currentPage(), this.limit).subscribe({
      next: (response) => {
        this.clients.set(response.clients);
        this.totalPages.set(response.totalPages);

        if (this.totalClients() === 0) {
          this.getTotalClients();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getTotalClients(): void {
    this.clientsService.getClients(this.totalPages(), this.limit).subscribe({
      next: (response) => {
        this.totalClients.set(
          (this.totalPages() - 1) * this.limit + response.clients.length
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToPage(page: number): void {
    if (page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadClients();
    }
  }

  onCreateClient(): void {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
        this.totalClients.set(this.totalClients() + 1);
      }
    });
  }

  onEditClient(client: Client): void {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      width: '500px',
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClients();
      }
    });
  }

  onDeleteClient(id: number): void {
    const client = this.clients().find((c) => c.id === id);

    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      width: '500px',
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientsService.deleteClient(id).subscribe({
          next: () => {
            this.totalClients.set(this.totalClients() - 1);
            this.loadClients();

            // Removendo o cliente da lista de selecionados caso ele seja apagado
            const selectedClients = this.selectedClients();
            const index = selectedClients.findIndex((c) => c.id === id);
            if (index !== -1) {
              selectedClients.splice(index, 1);
              this.selectedClients.set(selectedClients);
              this.selectedClientsService.setSelectedClients(selectedClients);
            }
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }

  toggleSelectClient(client: Client): void {
    const selectedClients = this.selectedClients();
    const index = selectedClients.findIndex((c) => c.id === client.id);

    if (index === -1) {
      selectedClients.push(client);
    } else {
      selectedClients.splice(index, 1);
    }

    this.selectedClients.set(selectedClients);
    this.selectedClientsService.setSelectedClients(selectedClients);
  }

  isSelected(client: Client): boolean {
    return this.selectedClients().some((c) => c.id === client.id);
  }
}
