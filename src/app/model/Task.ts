import {Priority} from './Priority';
import {Category} from './Category';
import {BaseEntity} from './BaseEntity';

export class Task extends BaseEntity {
    completed: boolean;
    priority?: Priority;
    category?: Category;
    date?: Date;
    
    constructor(id: number, title: string, completed: boolean, priority: Priority, category: Category, date: Date) {
        super(id, title);
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
    }
}
