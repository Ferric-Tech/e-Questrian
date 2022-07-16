import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SignInDetails } from '../modals/sign-in/sign-in.modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState as unknown as Observable<User>;
  }

  /* Sign up */
  UserRegistration(signInDetails: SignInDetails) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(
        signInDetails.email,
        signInDetails.password
      )
      .then((res: any) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error: any) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  UserSignIn(signInDetails: SignInDetails) {
    this.angularFireAuth
      .signInWithEmailAndPassword(signInDetails.email, signInDetails.password)
      .then((res: any) => {
        this.router.navigate(['home']);
      })
      .catch((err: any) => {
        console.log('Something went wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
  }

  async isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve) => {
      await this.angularFireAuth.onAuthStateChanged((user) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }
}
