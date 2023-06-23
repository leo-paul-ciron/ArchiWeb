import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialog-delete',
  templateUrl: './confirm-dialog-delete.component.html',
  styleUrls: ['./confirm-dialog-delete.component.scss']
})
export class ConfirmDialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }
  
}
