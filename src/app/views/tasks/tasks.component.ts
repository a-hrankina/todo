import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    private dataSource: MatTableDataSource<Task>;

    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    private tasks: Task[];

    @Input('tasks')
    private set setTasks(tasks: Task[]) {
        this.tasks = tasks;
        this.fillTable();
    }

    constructor(private dataHandler: DataHandlerService) {
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

    private fillTable() {

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

    private addTableObjects() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
