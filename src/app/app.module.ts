import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import {Inject, ViewChild} from 'angular2/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { FeedPage } from '../pages/feed/feed';
import { CommentsPage } from '../pages/comments/comments';
import { CodesignPage } from '../pages/codesign/codesign';
import { ConfigurePage } from '../pages/configure/configure';

import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';

import firebase from 'firebase';
import { config } from './app.firebaseconfig';

import { UserProvider } from '../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppVersion } from '@ionic-native/app-version';
import { UpdaterPage } from '../pages/updater/updater';
import { PopoverController } from 'ionic-angular';

import { Autosize } from '../components/autosize';
import { PopupsProvider } from '../providers/popups/popups';

import { PhotoViewer } from '@ionic-native/photo-viewer';

firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
})

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage,
    CommentsPage,
    UpdaterPage,
    CodesignPage,
    Autosize,
    ConfigurePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    FeedPage,
    CommentsPage,
    UpdaterPage,
    CodesignPage,
    ConfigurePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Firebase,
    AngularFireAuth,
    AppVersion,
    PopoverController,
    PhotoViewer,
    //ConfigurePage,
//    NavController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    PopupsProvider,
  ]
})
export class AppModule {}
