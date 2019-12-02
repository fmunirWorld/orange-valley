import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastController} from '@ionic/angular';
import {Activity} from '../types';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteActivityList: Observable<Activity[]>;

  constructor(private ngFireAuth: AngularFireAuth,
              private ngFirestore: AngularFirestore,
              private toastController: ToastController) {
    this.favoriteActivityList = ngFirestore
      .collection('favorites')
      .doc(ngFireAuth.auth.currentUser.uid)
      .collection<Activity>('favorites')
      .valueChanges();
  }

  removeFromFavorites(activity) {
    this.ngFirestore
      .collection('favorites')
      .doc(this.ngFireAuth.auth.currentUser.uid)
        .collection('favorites')
        .doc(activity.id)
          .delete()
          .then(() => {
            const toast = this.toastController.create({
              message: `The activity ${activity.name} was removed from your favorites.`,
              duration: 3500,
              position: 'top'
            });
            toast.then(toastMessage => toastMessage.present());
          })
          .catch(err => console.log(err));
  }

}
