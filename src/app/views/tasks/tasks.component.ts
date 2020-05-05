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
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
    dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    tasks: Task[];
    priorities: Priority[];

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

    searchTaskText: string;
    selectedStatusFilter: boolean = null;
    selectedPriorityFilter: Priority = null;

    isMobile: boolean;

    constructor(private dataHandler: DataHandlerService,
                private dialog: MatDialog,
                private deviceService: DeviceDetectorService) {
        this.isMobile = this.deviceService.isMobile();
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.onSelectCategory(null);
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

        // @ts-ignore
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

    addTableObjects(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    openEditDialog(task: Task): void {
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

    openDeleteDialog(task: Task) {
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

    onToggleStatus(task: Task) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }

    onSelectCategory(category: Category) {
        this.selectCategory.emit(category);
    }

    onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText);
    }

    onFilterByStatus(value: boolean) {
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }

    onFilterByPriority(value: Priority) {
        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }

    openAddDialog() {
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

    getMobilePriorityBgColor(task: Task) {
        if (task.priority != null && !task.completed) {
            return task.priority.color;
        }

        return 'none';
    }
}
