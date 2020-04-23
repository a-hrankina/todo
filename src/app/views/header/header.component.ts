import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {MatDialog} from '@angular/material';

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

    constructor(private dialog: MatDialog
    ) {
    }

    ngOnInit() {
    }

    private onToggleStatistics() {
        this.toggleStatistics.emit(!this.showStatistics);
    }

    private showSettings(): void {
        const dialogRef = this.dialog.open(
            SettingsDialogComponent, {
                autoFocus: false,
                width: '500px'
            });
    }
}
