import { Component, Input, OnInit } from '@angular/core';
import {
  DocView,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.scss'],
})
export class DocViewComponent implements OnInit {
  @Input() config = {} as DocView;

  generalConfig = {} as PageConfig;

  constructor() {}

  ngOnInit() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };

    console.log(this.config);
  }
}
