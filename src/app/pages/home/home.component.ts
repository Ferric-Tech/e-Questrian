import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum MenuOptions {
  CALENDAR,
  FINANCES,
  CLIENTS,
}

export interface MenuOption {
  display: string;
  option: MenuOptions;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', option: MenuOptions.CALENDAR },
    { display: 'Finances', option: MenuOptions.FINANCES },
    { display: 'Clients', option: MenuOptions.CLIENTS },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onMenuOptionClicked(option: MenuOptions) {
    switch (option) {
      case MenuOptions.CALENDAR: {
        this.router.navigate(['/calendar']);
        break;
      }
      case MenuOptions.FINANCES: {
        this.router.navigate(['/finances']);
        break;
      }
      case MenuOptions.CLIENTS: {
        this.router.navigate(['/clients']);
      }
    }
  }
}
