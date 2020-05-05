import {Component, Inject, OnInit} from '@angular/core';
import {OperationType} from '../OperationType';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-edit-priority-dialog',
    templateUrl: './edit-priority-dialog.component.html',
    styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

    dialogTitle: string;
    priorityTitle: string;
    operationType: OperationType;

    constructor(
        private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: [string, string, OperationType],
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.priorityTitle = this.data[0];
        this.dialogTitle = this.data[1];
        this.operationType = this.data[2];
    }

    onConfirm(): void {
        this.dialogRef.close(this.priorityTitle);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    delete(): void {
        const dialogRef = this.dialog.open(
            ConfirmDialogComponent, {
                maxWidth: '500px',
                data: {
                    dialogTitle: 'Confirm action',
                    message: `Are you sure you want to delete the priority: "${this.priorityTitle}"?`
                },
                autoFocus: false
            });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete');
            }
        });
    }

    canDelete(): boolean {
        return this.operationType === OperationType.EDIT;
    }

}
