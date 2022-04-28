import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
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

  generalConfig = {} as PageConfig;

  constructor(public router: Router) {}

  ngOnInit() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }
}
