import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  FinancialDocItem,
  FinancialDocListPageConfig,
  FinancialDocType,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-financial-doc-list',
  templateUrl: './financial-doc-list.component.html',
  styleUrls: ['./financial-doc-list.component.scss'],
})
export class FinancialDocListComponent implements OnInit {
  @Input() config = {} as FinancialDocListPageConfig;
  @Output() itemClicked = new EventEmitter<number>();

  financialDocType = FinancialDocType;
  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit() {
    this.setPageConfig();
  }

  private setPageConfig() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }

  onItemClicked(item: FinancialDocItem) {
    this.itemClicked.emit(item.number);
  }
}
