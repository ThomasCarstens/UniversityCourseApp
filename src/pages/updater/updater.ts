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
  CurrentVersion:string="2.0.0"; //to be updated every version (here and updater.ts)

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.checkforupdate();
//console.log(this.CurrentVersion);
//console.log(this.MostRecentVersion);
//    if (this.MostRecentVersion === this.CurrentVersion) {
//        console.log('Up to date.');
//        this.navCtrl.setRoot(LoginPage);
//    } else { console.log('Update Required.');
//     }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdaterPage');
  }

  checkforupdate(){

    //find required version number from Firestore
        firebase.firestore().collection("requiredversion").doc("androidversion").get().then((data) => {

            this.MostRecentVersion = data.data().version_nb || "none";
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

          }).catch((err) => {
            console.log(err)
          })


  }

}
