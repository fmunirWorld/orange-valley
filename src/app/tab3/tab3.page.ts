import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myProfileImage;
  myStoredProfileImage: Observable<any>;

  constructor(private alertController: AlertController,
              private camera: Camera,
              private ngFireAuth: AngularFireAuth,
              private ngFirestore: AngularFirestore) {
    this.myStoredProfileImage = ngFirestore
      .collection('users')
      .doc(this.ngFireAuth.auth.currentUser.uid).valueChanges();
  }

  async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 150,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 150,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    const alert = await this.alertController.create({
      header: 'Select Source',
      message: 'Pick a source for your image',
      buttons: [
        {
          text: 'Camera',
          handler: value => {
            this.camera.getPicture(cameraOptions).then((imageData) => {
              // this.myProfileImage = 'data:image/jpeg;base64,' + imageData;
              const image = 'data:image/jpeg;base64,' + imageData;
              this.ngFirestore
                .collection('users')
                .doc(this.ngFireAuth.auth.currentUser.uid)
                .set({
                  image_src: image,
                });
            });
          }
        },
        {
          text: 'Gallery',
          handler: value => {
            this.camera.getPicture(galleryOptions).then((imageData) => {
              // this.myProfileImage = 'data:image/jpeg;base64,' + imageData;
              const image = 'data:image/jpeg;base64,' + imageData;
              this.ngFirestore
                .collection('users')
                .doc(this.ngFireAuth.auth.currentUser.uid)
                .set({
                  image_src: image,
                });
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
