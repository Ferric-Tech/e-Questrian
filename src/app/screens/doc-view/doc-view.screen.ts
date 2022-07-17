import { Component, Input, OnInit } from '@angular/core';
import {
  DocView,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-doc-view-screen',
  templateUrl: './doc-view.screen.html',
  styleUrls: ['./doc-view.screen.scss'],
})
export class DocViewScreen implements OnInit {
  @Input() config = {} as DocView;

  generalConfig = {} as PageConfig;

  constructor() {}

  ngOnInit() {
    this.generalConfig = {
      header: this.config.header,
      subHeader: this.config.subHeader,
    };
  }
}
