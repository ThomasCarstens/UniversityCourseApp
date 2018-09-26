import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController,
AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
import { AppVersion } from '@ionic-native/app-version';

import { UpdaterPage } from '../updater/updater';
import { PopoverController } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string = "";
  password: string = "";
  requiredversion:string;
  appversion:string; //to be updated every version (here and updater.ts)

  constructor(public navCtrl: NavController,
              private appVersion: AppVersion,
              public toastCtrl: ToastController,
              public popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,

            ) {

              //UPDATE IF APP VERSION IS NOT MOST RECENT VERSION
        //following code finds two variables and compares them
       firebase.firestore().collection("settings").doc("version").get().then(async(user) => {
           //await user.data().currentversion;
           this.appversion = user.data().ANDROIDappversion || "none";
           this.requiredversion = user.data().requiredversion || "none";
         }).catch(err => {
           console.log(err);
         })

           setTimeout(() => {
                this.pushtoupdate();
              }, 3000);
  }

  pushtoupdate(){
    //find required version number from Firestore
    console.log(this.requiredversion);
    console.log(this.appversion);

            if (this.requiredversion == this.appversion) {
                console.log('Up to date.');
                //nothing happens.
            } else { console.log('Update Required.');
                this.navCtrl.setRoot(UpdaterPage);
             }
  }

  onLogin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Logging you in...'
    });
    loading.present();


    console.log(form.value);
    firebase.auth().signInWithEmailAndPassword(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();

        //this.navCtrl.setRoot(FeedPage)
        //this.navCtrl.push(FeedPage);
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Login failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

/* old version
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
  */

  gotoSignup(){
    this.navCtrl.push(SignupPage);
  }

}
