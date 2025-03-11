import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clientes-edit-client-dialog',
  imports: [ReactiveFormsModule, MatDialogClose],
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.scss',
})
export class EditClientDialogComponent {
  formBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef);
  clientsService = inject(ClientsService);

  editClientForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    salary: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    companyValuation: [
      0,
      [Validators.required, Validators.pattern(/^[1-9]\d*$/)],
    ],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { client: Client }) {
    this.editClientForm.patchValue({
      name: data.client.name,
      salary: data.client.salary,
      companyValuation: data.client.companyValuation,
    });
  }

  onEdit(): void {
    if (this.editClientForm.valid) {
      const body = {
        id: this.data.client.id,
        name: this.editClientForm.get('name')?.value,
        salary: +this.editClientForm.get('salary')?.value!,
        companyValuation: +this.editClientForm.get('companyValuation')?.value!,
      } as Client;

      this.clientsService.updateClient(body).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error updating client:', error);
        },
      });
    }
  }
}
