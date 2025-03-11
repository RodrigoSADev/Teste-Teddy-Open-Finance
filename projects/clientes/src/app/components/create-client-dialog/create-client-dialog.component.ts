import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clientes-create-client-dialog',
  imports: [ReactiveFormsModule, MatDialogClose],
  templateUrl: './create-client-dialog.component.html',
  styleUrl: './create-client-dialog.component.scss',
})
export class CreateClientDialogComponent {
  FormBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
  clientsService = inject(ClientsService);

  addClientForm = this.FormBuilder.group({
    name: ['', [Validators.required]],
    salary: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    companyValuation: [
      0,
      [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    ],
  });

  onSubmit(): void {
    if (this.addClientForm.valid) {
      const body = {
        name: this.addClientForm.get('name')?.value,
        salary: +this.addClientForm.get('salary')?.value!,
        companyValuation: +this.addClientForm.get('companyValuation')?.value!,
      } as Client;

      this.clientsService.createClient(body).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error creating client:', error);
        },
      });
    }
  }
}
