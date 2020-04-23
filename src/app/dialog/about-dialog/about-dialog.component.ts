import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-about-dialog',
    templateUrl: './about-dialog.component.html',
    styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

    private dialogTitle: string;
    private message: string;

    constructor(
        private dialogRef: MatDialogRef<AboutDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string }
    ) {
        this.dialogTitle = data.dialogTitle;
        this.message = data.message;
    }

    ngOnInit() {
    }

    private onConfirm(): void {
        this.dialogRef.close(true);
    }
}
