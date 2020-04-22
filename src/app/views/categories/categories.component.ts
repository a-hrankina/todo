import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperationType} from '../../dialog/OperationType';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    @Input()
    categories: Category[];

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

    @Input()
    private selectedCategory: Category;

    private indexMouseMove: number;
    private searchCategoryTitle: string;

    constructor(private dataHandler: DataHandlerService,
                private dialog: MatDialog) {
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
        if (this.searchCategoryTitle == null ) {
            return;
        }

        this.searchCategory.emit(this.searchCategoryTitle);
    }
}
