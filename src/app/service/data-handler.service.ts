import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {Observable} from 'rxjs';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    private categoryDaoArray = new CategoryDAOArray();
    private taskDaoArray = new TaskDAOArray();

    constructor() {
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDaoArray.getAll();
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }
}
