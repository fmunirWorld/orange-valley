import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginCredential} from '../types';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private toastController: ToastController) {
    this.loginFormGroup = formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredentials)
      .then(authData => {
        this.router.navigate(['/tabs'])
          .then(() => this.loginFormGroup.reset());
      })
      .catch(err => {
        const toast = this.toastController.create({
          message: `${err}`,
          duration: 5000,
          position: 'bottom'
        });
        toast.then(toastMessage => toastMessage.present());
      });
  }

}
