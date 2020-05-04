import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {MatDialog} from '@angular/material';
import {IntroService} from '../../service/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';

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

    @Output()
    toggleMenu = new EventEmitter();

    private isMobile: boolean;

    constructor(private dialog: MatDialog,
                private introService: IntroService,
                private deviceDetector: DeviceDetectorService
    ) {
        this.isMobile = deviceDetector.isMobile();
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

    private onToggleMenu() {
        this.toggleMenu.emit();
    }
}
