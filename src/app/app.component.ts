import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {Inject, ViewChild} from 'angular2/core';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FeedPage } from '../pages/feed/feed';
import { CodesignPage } from '../pages/codesign/codesign';

import firebase from 'firebase';
import { config } from './app.firebaseconfig';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  isAuthenticated = false;
  //aboutPage = AboutPage;
  //codesignPage = CodesignPage;
  //@ViewChild('nav') nav: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              //public navCtrl: NavController,
            ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isAuthenticated = true;
          this.rootPage = FeedPage;
          console.log(this.isAuthenticated)
        } else {
          this.isAuthenticated = false;
          this.rootPage = LoginPage;
          console.log(this.isAuthenticated)
        }
      });
    });


  }

//GotoCodesign(){
//  this.rootPage = CodesignPage;
//}

}
