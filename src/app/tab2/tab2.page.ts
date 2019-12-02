import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteActivityList: Observable<any>;

  constructor(private ngFireAuth: AngularFireAuth,
              private ngFirestore: AngularFirestore) {
    this.favoriteActivityList = ngFirestore
      .collection('favorites')
      .doc(ngFireAuth.auth.currentUser.uid)
      .collection('favorites')
      .valueChanges();
  }

}
