import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    @Input()
    totalTasksInCategory: number;

    @Input()
    completedTasksInCategory: number;

    @Input()
    uncompletedTasksInCategory: number;

    @Input()
    showStatistics: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
