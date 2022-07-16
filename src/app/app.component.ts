import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-questrian';

  email: string = '';
  password: string = '';

  constructor(public router: Router, private td: TestDataService) {
    router.navigate(['/home']);
    this.td.loadTestDataToLocal();
  }
}
