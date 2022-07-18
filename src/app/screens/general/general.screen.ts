import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageConfig } from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-screen',
  templateUrl: './general.screen.html',
  styleUrls: ['./general.screen.scss'],
})
export class GeneralScreen {
  @Input() config = {} as PageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();
}
