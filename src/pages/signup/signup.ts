import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { FeedPage } from '../feed/feed';
//import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string = "";
  email: string = "";
  password: string = "";
  usertype: string = "";

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              //public userservice: UserProvider,
          ) {
  }

  signup(){

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((data) => {

      console.log(data)

      firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
        name: this.name,
        usertype: "Student",
        studentnumber: this.email
      }).then((doc) => {
        console.log(doc)
        console.log("this.name in collection:")
        console.log(this.name)
      }).catch((err) => {
        console.log(err)
      })

      let newUser: firebase.User = data.user;
      //this.userservice.adduser(newUser);
      newUser.updateProfile({
        displayName: this.name,
        photoURL: "",
      }).then(() => {
        console.log("New name on firebase:")
        console.log(newUser.displayName)

        this.alertCtrl.create({
          title: "Account Created",
          message: "Your account has been created successfully.",
          buttons: [
            {
              text: "OK",
              handler: () => {
                //Navigate to the feeds page
                this.navCtrl.setRoot(FeedPage)
              }
            }
          ]
        }).present();

      }).catch((err) => {
        console.log(err)
      })

    }).catch((err) => {
      console.log(err)
      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).present();
    })

  }

/////////////////////

  goBack(){
    this.navCtrl.pop();
  }

}
