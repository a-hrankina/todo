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

    private dialogTitle: string;
    private priorityTitle: string;
    private operationType: OperationType;

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

    private onConfirm(): void {
        this.dialogRef.close(this.priorityTitle);
    }

    private onCancel(): void {
        this.dialogRef.close(false);
    }

    private delete(): void {
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

    private canDelete(): boolean {
        return this.operationType === OperationType.EDIT;
    }

}
