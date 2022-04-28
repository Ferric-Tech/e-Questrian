import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  FinancialDoc,
  FinancialDocListPageConfig,
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

  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }

  onItemClicked(item: FinancialDoc) {
    this.itemClicked.emit(item.number);
  }
}
