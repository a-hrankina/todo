import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {MatDialog} from '@angular/material';
import {IntroService} from '../../service/intro.service';

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

    constructor(private dialog: MatDialog,
                private introService: IntroService
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

    private showIntroHelp() {
        this.introService.startIntroJS(false);
    }
}
