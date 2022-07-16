import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInDetails } from 'src/app/modals/sign-in/sign-in.modal';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.authenticationService
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['home']);
          return;
        }
      });
  }

  signin(signInDetails: SignInDetails) {
    this.authenticationService.UserSignIn(signInDetails);
  }

  register(signInDetails: SignInDetails) {
    this.authenticationService.UserRegistration(signInDetails);
  }
}
