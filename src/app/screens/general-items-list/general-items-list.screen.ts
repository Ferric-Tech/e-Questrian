import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  GeneralItemsListPageConfig,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-items-list-screen',
  templateUrl: './general-items-list.screen.html',
  styleUrls: ['./general-items-list.screen.scss'],
})
export class GeneralItemsListScreen implements OnInit {
  @Input() config = {} as GeneralItemsListPageConfig;
  @Output() itemClicked = new EventEmitter<number>();

  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit() {
    this.setPageConfig();
    this.setColumnsWidths();
  }

  private setPageConfig() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }

  private setColumnsWidths() {
    let totalFactor = 0;
    this.config.columns.forEach((column) => {
      totalFactor = totalFactor + column.widthFactor;
    });
    this.config.columns.forEach((column, index) => {
      this.config.columns[index].widthPerc =
        (this.config.columns[index].widthFactor / totalFactor) * 100 + '%';
    });
    Object.keys(this.config.items).forEach((itemKey) => {
      this.config.items[parseInt(itemKey)].forEach((field, fieldIndex) => {
        this.config.items[parseInt(itemKey)][fieldIndex].widthPerc =
          this.config.columns[fieldIndex].widthPerc;
      });
    });
  }

  onItemClicked(itemKey: string) {
    this.itemClicked.emit(parseInt(itemKey));
  }
}
