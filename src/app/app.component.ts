import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private title = 'Todo';
    private categories: Category[];
    private tasks: Task[];
    private priorities: Priority[];

    private selectedCategory: Category = null;

    private searchTaskText = '';
    private priorityFilter: Priority;
    private statusFilter: boolean;

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
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
            this.updateTasks()
        );
    }

    onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(() =>
            this.updateTasks()
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

    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    private onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }
    private onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority;
        this.updateTasks();
    }

    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }
}
