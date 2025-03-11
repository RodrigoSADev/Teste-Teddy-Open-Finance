import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-clientes-delete-client-dialog',
  imports: [MatDialogClose],
  templateUrl: './delete-client-dialog.component.html',
  styleUrl: './delete-client-dialog.component.scss',
})
export class DeleteClientDialogComponent {
  dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { client: Client }) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
