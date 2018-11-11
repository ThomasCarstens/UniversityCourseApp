import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage} from '../login/login';
/**import {LoginPage} from '../login/login';
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userservice: UserProvider,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
          ) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad PasswordresetPage');
  }

  reset() {
    //this.CheckYourEmail();
    this.userservice.passwordreset(this.email).then((res: any) => {
      //if (res.success) {
        console.log('Email sent');
        let toast = this.toastCtrl.create({
          message: "Email Sent.",
          duration: 3000
        }).present();
        //alert.setTitle('Email Sent');
        //alert.setSubTitle('Please follow the instructions in the email to reset your password');
      }).catch((err) => {
      console.log('Failed');
      let toast = this.toastCtrl.create({
      message: err,
        duration: 3000
      }).present();
      //alert.setTitle('Failed');
    })
  }

  goback() {
    this.navCtrl.setRoot(LoginPage);
  }


  CheckYourEmail(){
    let alert = this.alertCtrl.create({
      title: 'Please check your email.',
      subTitle: 'It will redirect you to change your password.',
      buttons: [

        {
          text: 'Ok',
          handler: offhand => {
            if (1) {
            } else {
              // invalid login
              return false;
            }
          }
        }
      ],
      enableBackdropDismiss: true
    });
    alert.present();
  }
}
