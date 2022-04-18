import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-questrian';

  constructor(public router: Router, private td: TestDataService) {
    router.navigate(['/home']);
    this.td.loadTestDataToLocal();
  }
}
