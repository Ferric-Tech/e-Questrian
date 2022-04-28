import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  @Input() config = {} as MenuPageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();

  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit() {
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
