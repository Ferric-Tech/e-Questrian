import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuPageConfig,
  PageConfig,
} from 'src/app/interfaces/common-page-configs.interface';

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss'],
})
export class GeneralPageComponent {
  @Input() generalConfig = {} as PageConfig;
  @Output() viewStateSelected = new EventEmitter<any>();
}
