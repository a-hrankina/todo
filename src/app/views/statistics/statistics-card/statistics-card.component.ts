import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-statistics-card',
    templateUrl: './statistics-card.component.html',
    styleUrls: ['./statistics-card.component.css']
})
export class StatisticsCardComponent implements OnInit {

    @Input()
    completed = false;

    @Input()
    iconName: string;

    @Input()
    count1: any;

    @Input()
    countTotal: any;

    @Input()
    title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
