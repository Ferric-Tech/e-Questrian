import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPageConfig } from 'src/app/interfaces/common-page-configs.interface';
import { MenuOption } from 'src/app/interfaces/menu-options.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  config = {} as MenuPageConfig;
  readonly header = 'e-Questrian';
  readonly subHeader = '';
  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', path: '/calendar' },
    { display: 'Finances', path: '/finances' },
    { display: 'Clients', path: '/clients' },
  ];

  constructor(public router: Router) {
    this.config.header = this.header;
    this.config.subHeader = this.subHeader;
    this.config.menu = this.menuOptions;
  }
}
