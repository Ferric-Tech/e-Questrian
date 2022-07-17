import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  PageConfig,
  ProcessResultsPageConfig,
  ResultType,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-process-results-screen',
  templateUrl: './process-results.screen.html',
  styleUrls: ['./process-results.screen.scss'],
})
export class ProcessResultsScreen implements OnInit {
  @Input() config = {} as ProcessResultsPageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();

  generalConfig = {} as PageConfig;
  resultsType = ResultType;

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
