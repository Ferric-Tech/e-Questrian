import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-screen',
  templateUrl: './general.screen.html',
  styleUrls: ['./general.screen.scss'],
})
export class GeneralScreen {
  @Input() generalConfig = {} as PageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();
}
