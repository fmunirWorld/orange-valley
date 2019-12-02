import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Activity} from '../types';
import {ActivatedRoute} from '@angular/router';
import {ActivityService} from '../services/activity.service';
import {ModalController, ToastController} from '@ionic/angular';
import {ActivityVideoPage} from '../activity-video/activity-video.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  activityDetail: Observable<Activity>;

  constructor(
    activatedRoute: ActivatedRoute,
    activityService: ActivityService,
    private modalController: ModalController,
    private socialShare: SocialSharing,
    private ngFireAuth: AngularFireAuth,
    private ngFirestore: AngularFirestore,
    private toastController: ToastController
  ) {
    const activityId = activatedRoute.snapshot.params.id;
    this.activityDetail = activityService.getActivity(activityId);
  }

  ngOnInit() {
  }

  async openModal() {
    const videoModal = await this.modalController.create({
      component: ActivityVideoPage
    });

    return this.activityDetail.subscribe((activity) => {
      videoModal.componentProps = {
        videoUrl: activity.video_url
      };
      return videoModal.present();
    });
  }

  share() {
    this.activityDetail.subscribe(activity => {
      this.socialShare.share(
        'Look what I found on this app called Orange Valley...',
        activity.name,
        '',
        activity.cropped
      ).then(r => console.log(r));
    });
  }

  addToFavorites() {
    this.activityDetail.subscribe(activity => {
      this.ngFirestore
        .collection('favorites')
        .doc(this.ngFireAuth.auth.currentUser.uid)
        .collection('favorites', ref => {
          return ref.where('id', '==', activity.id);
        })
        .get()
        .subscribe(doc => {
          if (doc.empty) {
            this.ngFirestore
              .collection('favorites')
              .doc(this.ngFireAuth.auth.currentUser.uid)
                .collection('favorites')
                .add(activity)
              .then(() => {
                const toast = this.toastController.create({
                  message: `The activity ${activity.name} was added to your favorites.`,
                  duration: 3500,
                  position: 'top'
                });
                toast.then(toastMessage => toastMessage.present());
              });
          }
        });
    });
  }

}
