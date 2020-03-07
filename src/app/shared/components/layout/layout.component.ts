import {AfterViewInit, Component, ContentChild, Inject, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
    public selectedBase = 'EUR';
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        public router: Router,
        public dialog: MatDialog
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        if (this.router.url.split('/')[2] !== undefined) {
            this.selectedBase = this.router.url.split('/')[2];
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogContentComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.selectedBase = this.router.url.split('/')[2];
        });
    }

    onChangeSelectedBase() {
        if (this.selectedBase === 'EUR' && this.router.url.split('/')[1] === 'history-chart-rates') {
            this.openDialog();
        } else {
            this.router.navigate([this.router.url.split('/')[1], this.selectedBase]);
        }

    }

    ngAfterViewInit() {
    }
}

@Component({
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
})
export class DialogContentComponent {
    constructor(public dialogRef: MatDialogRef<DialogContentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: []) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
