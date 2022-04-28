import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOption } from 'src/app/interfaces/menu-options.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly menuOptions: MenuOption[] = [
    { display: 'Calendar', path: '/calendar' },
    { display: 'Finances', path: '/finances' },
    { display: 'Clients', path: '/clients' },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onMenuOptionClicked(path: string | undefined) {
    if (!path) return;
    this.router.navigate([path]);
  }
}
