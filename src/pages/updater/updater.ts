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

@IonicPage()
@Component({
  selector: 'page-updater',
  templateUrl: 'updater.html',
})

export class UpdaterPage {
  MostRecentVersion:string;
  CurrentVersion:string="2.0.1"; //to be updated every version (here and updater.ts)

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    firebase.firestore().collection("settings").doc("version").get().then(async(user) => {
        //await user.data().currentversion;
        this.CurrentVersion = user.data().currentversion || "none"

      }).catch(err => {
        console.log(err);
      })

      firebase.firestore().collection("requiredversion").doc("holidayversion").get().then(async (data) => {
           this.MostRecentVersion = await data.data().version_nb || "none";

        }).catch((err) => {
          console.log(err)
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
    console.log(this.MostRecentVersion);
    console.log(this.CurrentVersion);

            if (this.MostRecentVersion!= null) {
              if (this.MostRecentVersion === this.CurrentVersion) {
                  console.log('Up to date.');
                  this.navCtrl.setRoot(LoginPage);
              } else { console.log('Update Required.');
                  //nothing happens.
               }
           }

  }

}
