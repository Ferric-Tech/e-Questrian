import { Component, HostListener, OnInit } from '@angular/core';
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  innerWidth: number | undefined;
  isMobileView: boolean = false;
  displayMenu: boolean = true;

  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', option: MenuOptions.CALENDAR },
    { display: 'Finances', option: MenuOptions.FINANCES },
    { display: 'Clients', option: MenuOptions.CLIENTS },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.determineView();
  }

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.determineView();
  }

  onLogoClick() {
    this.router.navigate(['/home']);
  }

  onMenuIconClick() {
    this.displayMenu = !this.displayMenu;
  }

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

  private determineView() {
    this.innerWidth = window.innerWidth;
    this.isMobileView = this.innerWidth <= 450;
    this.displayMenu = !this.isMobileView;
  }
}
