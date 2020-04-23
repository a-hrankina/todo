import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input()
    categoryName: string;

    @Input()
    private showStatistics: boolean;

    @Output()
    toggleStatistics = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    private onToggleStatistics() {
        this.toggleStatistics.emit(!this.showStatistics);
    }

}
