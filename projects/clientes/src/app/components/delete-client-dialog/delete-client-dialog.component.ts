import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-clientes-delete-client-dialog',
  imports: [],
  templateUrl: './delete-client-dialog.component.html',
  styleUrl: './delete-client-dialog.component.scss',
})
export class DeleteClientDialogComponent {
  dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { client: Client }) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
