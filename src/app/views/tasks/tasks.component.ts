import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {Priority} from '../../model/Priority';
import {Category} from '../../model/Category';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {OperationType} from '../../dialog/OperationType';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
    private dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    private tasks: Task[];
    private priorities: Priority[];

    @Input('tasks')
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable();
    }

    @Input('priorities')
    private set setPriorities(priorities: Priority[]) {
        this.priorities = priorities;
    }

    @Input()
    selectedCategory: Category;

    @Output()
    selectCategory = new EventEmitter<Category>();

    @Output()
    addTask = new EventEmitter<Task>();

    @Output()
    updateTask = new EventEmitter<Task>();

    @Output()
    deleteTask = new EventEmitter<Task>();

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<Priority>();

    private searchTaskText: string;
    private selectedStatusFilter: boolean = null;
    private selectedPriorityFilter: Priority = null;

    constructor(private dataHandler: DataHandlerService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.fillTable();
    }

    getPriorityColor(task: Task): string {
        if (task.completed) {
            return '#F8F9FA';
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';
    }

    private fillTable(): void {

        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks;

        this.addTableObjects();

        this.dataSource.sortingDataAccessor = (task, colName) => {
            switch (colName) {
                case 'priority':
                    return task.priority ? task.priority.id : null;
                case 'category':
                    return task.category ? task.category.title : null;
                case 'date':
                    return task.date ? task.date : null;
                case 'title':
                    return task.title;
            }
        };

    }

    private addTableObjects(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private openEditDialog(task: Task): void {
        const dialogRef = this.dialog.open(
            EditTaskDialogComponent,
            {data: [task, 'Edit Task', OperationType.EDIT], autoFocus: false}
        );

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'complete') {
                task.completed = true;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'activate') {
                task.completed = false;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) {
                this.updateTask.emit(task);
                return;
            }
        });
    }

    private openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Confirm action',
                message: `Are you sure you want to delete the task: "${task.title}"?`,
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteTask.emit(task);
            }
        });
    }

    private onToggleStatus(task: Task) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }

    private onSelectCategory(category: Category) {
        this.selectCategory.emit(category);
    }

    private onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText);
    }

    private onFilterByStatus(value: boolean) {
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }

    private onFilterByPriority(value: Priority) {
        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }

    private openAddDialog() {
        const task = new Task(null, '', false, null, this.selectedCategory);
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Add Task', OperationType.ADD]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addTask.emit(task);
            }
        });

    }
}
