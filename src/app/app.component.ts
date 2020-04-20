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

    private selectedCategory: Category = null;

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.onSelectCategory(null);
    }

    private onSelectCategory(category: Category) {
        this.selectedCategory = category;

        this.dataHandler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null
        ).subscribe(tasks => this.tasks = tasks);
    }

    onUpdateTask(task: Task) {
        this.dataHandler.updateTask(task).subscribe(() =>
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(tasks => this.tasks = tasks)
        );
    }

    onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(() =>
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(tasks => this.tasks = tasks)
        );
    }

    onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(() => {
            this.selectedCategory = null;
            this.onSelectCategory(this.selectedCategory);
        });
    }

    onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSelectCategory(this.selectedCategory);
        });
    }
}
