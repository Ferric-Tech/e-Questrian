import { Component, OnInit } from '@angular/core';
import { SignInDetails } from 'src/app/modals/sign-in/sign-in.modal';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  signin(signInDetails: SignInDetails) {
    this.authenticationService.UserSignIn(signInDetails);
  }

  register(signInDetails: SignInDetails) {
    this.authenticationService.UserRegistration(signInDetails);
  }
}
