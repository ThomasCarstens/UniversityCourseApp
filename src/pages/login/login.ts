import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
import { AppVersion } from '@ionic-native/app-version';

import { UpdaterPage } from '../updater/updater';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";
  MostRecentVersion:string;
  CurrentVersion:string="0.0.8"; //to be updated every version (here and updater.ts)

  constructor(public navCtrl: NavController,
              private appVersion: AppVersion,
              public toastCtrl: ToastController,
              public popoverCtrl: PopoverController,
            ) {
        this.pushtoupdate();

  }

  pushtoupdate(){
    //find required version number from Firestore
        firebase.firestore().collection("requiredversion").doc("dFlsKyVxn3NZucaxjWJW").get().then((data) => {

            this.MostRecentVersion = data.data().versionnumber || "none";
            console.log(this.MostRecentVersion);
            console.log(this.CurrentVersion);

            if (this.MostRecentVersion!= null) {
              if (this.MostRecentVersion === this.CurrentVersion) {
                  console.log('Up to date.');
                  //nothing happens.
              } else { console.log('Update Required.');
                  this.navCtrl.setRoot(UpdaterPage);
               }
           }

          }).catch((err) => {
            console.log(err)
          })
  }

  login(){

    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      console.log(user)

      this.toastCtrl.create({
        message: "Welcome " + user.user.displayName,
        duration: 3000
      }).present();

      this.navCtrl.setRoot(FeedPage)

    }).catch((err) => {
      console.log(err)
      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })

  }

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }

}
