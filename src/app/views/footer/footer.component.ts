import {Component, OnInit} from '@angular/core';
import {AboutDialogComponent} from '../../dialog/about-dialog/about-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    private year: Date;
    private site = 'http://localhost:4200';
    private siteName = 'Todo';

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
        this.year = new Date();
    }

    private openAboutDialog() {
        this.dialog.open(AboutDialogComponent,
            {
                autoFocus: false,
                data: {
                    dialogTitle: 'About Us',
                    message: 'Todo list'
                },
                width: '400px'
            });
    }

}
