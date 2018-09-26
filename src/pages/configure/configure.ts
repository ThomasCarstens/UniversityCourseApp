import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-configure',
  templateUrl: 'configure.html',
})
export class ConfigurePage {

  constructor( public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurePage');
  }


presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
}

presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm purchase',
    message: 'Do you want to buy this book?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Buy',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}

presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
          if (1) {
            // logged in!
          } else {
            // invalid login
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}
}
