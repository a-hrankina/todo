import {BaseEntity} from './BaseEntity';

export class Priority extends BaseEntity {
    color: string;

    constructor(id: number, title: string, color: string) {
        super(id, title);
        this.color = color;
    }
}
