import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface SignInDetails {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in.modal.html',
  styleUrls: ['./sign-in.modal.scss'],
})
export class SignInModal implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Output() signin = new EventEmitter<SignInDetails>();
  @Output() register = new EventEmitter<SignInDetails>();

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isRegister: boolean = false;

  ngOnInit(): void {}

  onSubmitClick() {
    if (this.isRegister) {
      this.register.emit(this.signInForm.value as SignInDetails);
      return;
    }
    this.signin.emit(this.signInForm.value as SignInDetails);
  }

  onRegisterClick() {
    this.isRegister = true;
  }
}
