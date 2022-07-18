import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-menu-screen',
  templateUrl: './menu.screen.html',
  styleUrls: ['./menu.screen.scss'],
})
export class MenuScreen implements OnInit {
  @Input() config = {} as MenuPageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();

  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }

  onMenuOptionClicked(path: string | undefined, viewState: any | undefined) {
    path
      ? this.router.navigate([path])
      : this.viewStateSelected.emit(viewState);
  }
}
