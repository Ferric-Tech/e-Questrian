import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPageConfig } from 'src/app/interfaces/common-page-configs.interface';
import { MenuOption } from 'src/app/interfaces/menu-options.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  config: MenuPageConfig | undefined;

  constructor(public router: Router) {}

  ngOnInit() {
    this.setConfig();
  }

  setConfig() {
    this.config = {
      header: 'e-Questrian',
      subHeader: '',
      menu: [
        { display: 'Calendar', path: '/calendar' },
        { display: 'Finances', path: '/finances' },
        { display: 'Clients', path: '/clients' },
      ],
    };
  }
}
