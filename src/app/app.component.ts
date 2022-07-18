import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-questrian';

  constructor(public router: Router, private td: TestDataService) {}

  ngOnInit() {
    this.router.navigate(['/home']);
    this.td.loadTestDataToLocal();
  }
}
