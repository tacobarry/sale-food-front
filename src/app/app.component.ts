import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SaleFood';
  @ViewChild('sidenav') sidenav: MatSidenav;

  public reason: string = '';
  public shouldRun: boolean;
  public navBarClicked: boolean;

  constructor() { }

  ngOnInit() {
    this.shouldRun = true;
    this.navBarClicked = false;
  }

  toggleSideNav(event: any) {
    this.sidenav.toggle();
    this.navBarClicked = !this.navBarClicked;
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
}
