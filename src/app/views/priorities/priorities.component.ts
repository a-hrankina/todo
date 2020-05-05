import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperationType} from '../../dialog/OperationType';
import {EditPriorityDialogComponent} from '../../dialog/edit-priority-dialog/edit-priority-dialog.component';

@Component({
    selector: 'app-priorities',
    templateUrl: './priorities.component.html',
    styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

    static defaultColor = '#fff';

    @Output()
    addPriority = new EventEmitter<Priority>();

    @Output()
    updatePriority = new EventEmitter<Priority>();

    @Output()
    deletePriority = new EventEmitter<Priority>();

    @Input()
    priorities: [Priority];

    constructor(private dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    delete(priority: Priority): void {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Confirm action',
                message: `Are you sure you want to delete the priority: "${priority.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deletePriority.emit(priority);
            }
        });
    }

    onAddPriority(): void {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Add priority', OperationType.ADD],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const p = new Priority(null, result as string, PrioritiesComponent.defaultColor);
                this.addPriority.emit(p);
            }
        });
    }

    onEditPriority(priority: Priority): void {
        const dialogRef = this.dialog.open(
            EditPriorityDialogComponent, {
                data: [priority.title, 'Edit priority', OperationType.EDIT]
            });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.deletePriority.emit(priority);
                return;
            }

            if (result) {
                priority.title = result as string;
                this.updatePriority.emit(priority);
                return;
            }
        });
    }
}

