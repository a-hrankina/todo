import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  private dialogTitle: string;
  private message: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string}) { }

  ngOnInit() {
    this.dialogTitle = this.data.dialogTitle;
    this.message = this.data.message;
  }

  private onConfirm(): void {
    this.dialogRef.close(true);
  }

  private onCancel(): void {
    this.dialogRef.close(false);
  }
}
