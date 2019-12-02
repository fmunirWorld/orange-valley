import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginCredential} from '../types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private ngFireAuth: AngularFireAuth) {}

  login(credentials: LoginCredential): Promise<any> {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }
}
