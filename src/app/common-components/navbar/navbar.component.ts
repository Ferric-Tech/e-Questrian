import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  innerWidth: number | undefined;
  isMobileView: boolean = false;
  displayMenu: boolean = true;

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

  private determineView() {
    this.innerWidth = window.innerWidth;
    this.isMobileView = this.innerWidth <= 450;
    this.displayMenu = !this.isMobileView;
  }
}
