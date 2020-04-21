import {CategoryDAO} from '../interface/CategoryDAO';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDAOArray implements CategoryDAO {

    add(category: Category): Observable<Category> {
        if (category.id === null || category.id === 0) {
            category.id = this.getLastIdCategory();
        }

        TestData.categories.push(category);
        return of(category);
    }

    private getLastIdCategory(): number {
        return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
    }

    delete(id: number): Observable<Category> {

        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null;
            }
        });

        const tmpCategory = TestData.categories.find(c => c.id === id);
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
        return of(tmpCategory);
    }

    get(id: number): Observable<Category> {
        return undefined;
    }

    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

    search(title: string): Observable<Category[]> {
        return undefined;
    }

    update(category: Category): Observable<Category> {
        const tmpCategory = TestData.categories.find(c => c.id === category.id);
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, tmpCategory);
        return of(tmpCategory);
    }

}
