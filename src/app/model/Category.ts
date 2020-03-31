import {BaseEntity} from './BaseEntity';

export class Category extends BaseEntity {

    constructor(id: number, title: string) {
        super(id, title);
    }
}
