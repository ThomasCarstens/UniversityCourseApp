import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
import { LoginPage } from '../login/login';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the UpdaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-updater',
  templateUrl: 'updater.html',
})

export class UpdaterPage {
  requiredversion:string;
  appversion:string; //to be updated every version (here and updater.ts)

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    firebase.firestore().collection("settings").doc("version").get().then(async(user) => {
        //await user.data().currentversion;
        this.appversion = user.data().ANDROIDappversion || "none"
        this.requiredversion = user.data().requiredversion || "none";
      }).catch(err => {
        console.log(err);
      })

        setTimeout(() => {
             this.pushtoupdate();
           }, 3000);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdaterPage');
  }

  pushtoupdate(){

    //find required version number from Firestore
    console.log(this.requiredversion);
    console.log(this.appversion);

              if (this.requiredversion === this.appversion) {
                  console.log('Up to date.');
                  this.navCtrl.setRoot(LoginPage);
              } else { console.log('Update Required.');
                  //nothing happens.
               }

  }

}
