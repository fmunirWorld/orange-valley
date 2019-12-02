import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginCredential} from '../types';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
    this.loginFormGroup = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredentials)
      .then(authData => {
        this.router.navigate(['/tabs']);
      })
      .catch(error => console.log(error));
  }

}
