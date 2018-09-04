import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  post: any = {};
  comments : any[] = [];
  CurrentStudentName : string;
  commentownername : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

    this.post = this.navParams.get("post");
    console.log(this.post)

    firebase.firestore().collection("comments")
    .where("post", "==", this.post.id)
    .orderBy("created", "asc")
    .get()
    .then((data) => {
      this.comments = data.docs;
    }).catch((err) => {
      console.log(err)
    })

//Current User details
  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((data) => {

      this.CurrentStudentName = data.data().studentnumber || "none";
      console.log(this.CurrentStudentName); //this works
  });

//for each comment: comment details.
//  firebase.firestore().collection("comments").doc().get().then((data) => {
//      this.commentownername = data.data().owner_name|| "none";
//      console.log(this.commentownername);
//  });


}

  close(){
    this.viewCtrl.dismiss();
  }

  ago(time) {
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

}
