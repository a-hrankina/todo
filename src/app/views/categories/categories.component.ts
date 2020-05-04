import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperationType} from '../../dialog/OperationType';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    @Input()
    categories: Category[];

    @Input()
    selectedCategory: Category;

    private selectedCategoryMap: Map<Category, number>;

    @Input('categoryMap')
    set setCategoryMap(categoryMap: Map<Category, number>) {
        this.selectedCategoryMap = categoryMap;
    }

    @Input()
    uncompletedTotal: number;

    @Output()
    selectCategory = new EventEmitter<Category>();

    @Output()
    addCategory = new EventEmitter<string>();

    @Output()
    deleteCategory = new EventEmitter<Category>();

    @Output()
    updateCategory = new EventEmitter<Category>();

    @Output()
    searchCategory = new EventEmitter<string>();

    private indexMouseMove: number;
    private searchCategoryTitle: string;

    private isMobile: boolean;
    private isTablet: boolean;

    constructor(private dataHandler: DataHandlerService,
                private dialog: MatDialog,
                private deviceService: DeviceDetectorService) {
        this.isMobile = deviceService.isMobile();
        this.isTablet = deviceService.isTablet();
    }

    ngOnInit() {
    }

    private showTasksByCategory(category: Category): void {
        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category;
        this.selectCategory.emit(this.selectedCategory);
    }

    private showEditIcon(index: number): void {
        this.indexMouseMove = index;
    }

    private openEditDialog(category: Category) {
        const dialogRef = this.dialog.open(
            EditCategoryDialogComponent, {
                data: [category.title, 'Edit Category', OperationType.EDIT],
                width: '400px'
            });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') {
                this.deleteCategory.emit(category);
                return;
            }

            if (typeof (result) === 'string') {
                category.title = result as string;
                this.updateCategory.emit(category);
                return;
            }
        });
    }

    private openAddDialog() {
        const dialogRef = this.dialog.open(
            EditCategoryDialogComponent, {
                data: ['', 'Add Category', OperationType.ADD],
                width: '400px'
            });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addCategory.emit(result as string);
            }
        });
    }

    private search() {
        if (this.searchCategoryTitle == null) {
            return;
        }

        this.searchCategory.emit(this.searchCategoryTitle);
    }
}
