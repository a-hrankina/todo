import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './service/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    categoryMap = new Map<Category, number>();

    categories: Category[];
    tasks: Task[];
    priorities: Priority[];

    selectedCategory: Category = null;

    searchTaskText = '';
    searchCategoryText = '';
    priorityFilter: Priority;
    statusFilter: boolean;

    showStatistics = true;

    totalTasksCountInCategory: number;
    completedCountInCategory: number;
    uncompletedCountInCategory: number;
    uncompletedTotalTasksCount: number;

    menuOpened: boolean;
    menuMode: string;
    menuPosition: string;
    showBackdrop: boolean;

    isMobile: boolean;
    isTablet: boolean;

    constructor(private dataHandler: DataHandlerService,
                private introService: IntroService,
                private deviceService: DeviceDetectorService) {
        this.isMobile = deviceService.isMobile();
        this.isTablet = deviceService.isTablet();

        this.showStatistics = true ? !this.isMobile : false;

        this.setMenuValues();
    }

    ngOnInit(): void {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

        this.fillCategories();

        this.onSelectCategory(null);

        if (!this.isMobile && !this.isTablet) {
            this.introService.startIntroJS(true);
        }
    }

    private fillCategories() {
        if (this.categoryMap) {
            this.categoryMap.clear();
        }

        this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

        this.categories.forEach(cat => {
            this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
        });
    }

    onAddCategory(title: string) {
        this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
    }

    private updateCategories() {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSearchCategory(this.searchCategoryText);
        });
    }

    onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(c => {
            this.selectedCategory = null;
            this.categoryMap.delete(c);
            this.onSearchCategory(this.searchCategoryText);
            this.updateTasks();
        });
    }

    onSelectCategory(category: Category) {
        this.selectedCategory = category;
        this.updateTasksAndStatistics();
    }

    onUpdateTask(task: Task): void {
        this.dataHandler.updateTask(task).subscribe(() => {
            this.fillCategories();
            this.updateTasksAndStatistics();
        });

    }

    onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            concatMap(task => {
                    return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
                        return ({t: task, count});
                    }));
                }
            )).subscribe(result => {
            const t = result.t as Task;
            if (t.category) {
                this.categoryMap.set(t.category, result.count);
            }
            this.updateTasksAndStatistics();
        });
    }

    onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }

    onFilterTasksByPriority(priority: Priority) {
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

    onAddTask(task: Task) {
        this.dataHandler.addTask(task).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            concatMap(task => {
                    return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
                        return ({t: task, count});
                    }));
                }
            )).subscribe(result => {
            const t = result.t as Task;
            if (t.category) {
                this.categoryMap.set(t.category, result.count);
            }
            this.updateTasksAndStatistics();
        });
    }

    onSearchCategory(title: string) {
        this.searchCategoryText = title;

        this.dataHandler.searchCategories(title).subscribe(categories => {
            this.categories = categories;
        });
    }

    private updateTasksAndStatistics() {
        this.updateTasks();
        this.updateStatistics();

    }

    updateStatistics() {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount())

            .subscribe(array => {
                this.totalTasksCountInCategory = array[0];
                this.completedCountInCategory = array[1];
                this.uncompletedCountInCategory = array[2];
                this.uncompletedTotalTasksCount = array[3];
            });
    }

    toggleStatistics(showStatistics: boolean) {
        this.showStatistics = showStatistics;
    }

    onClosedMenu() {
        this.menuOpened = false;
    }

    setMenuValues() {
        this.menuPosition = 'left';

        if (this.isMobile) {
            this.menuOpened = false;
            this.menuMode = 'over';
            this.showBackdrop = true;
        } else {
            this.menuOpened = true
            this.menuMode = 'push';
            this.showBackdrop = false;
        }
    }

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

}
