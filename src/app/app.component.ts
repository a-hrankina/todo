import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Todo';
    categories: Category[];
    tasks: Task[];

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    }
}
