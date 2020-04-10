import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

    private categories: Category[];
    private priorities: Priority[];

    private dialogTitle: string;
    private task: Task;

    private tmpTitle: string;
    private tmpCategory: Category;
    private tmpPriority: Priority;

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: [Task, string],
        private dataHandler: DataHandlerService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.task = this.data[0];
        this.dialogTitle = this.data[1];

        this.tmpTitle = this.task.title;
        this.tmpCategory = this.task.category;
        this.tmpPriority = this.task.priority;

        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    }

    private onConfirm(): void {
        this.task.title = this.tmpTitle;
        this.task.category = this.tmpCategory;
        this.task.priority = this.tmpPriority;

        this.dialogRef.close(this.task);
    }

    private onCancel(): void {
        this.dialogRef.close(null);
    }

    private delete(): void {
        const dialogRef = this.dialog.open(
            ConfirmDialogComponent, {
                maxWidth: '500px',
                data: {
                    dialogTitle: 'Confirm action',
                    message: `Are you sure you want to delete the task: "${this.task.title}" ?`
                },
                autoFocus: false
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete');
            }
        });
    }
}
